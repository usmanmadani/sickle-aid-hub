import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Loader2, Check } from "lucide-react";

const OUTPUT_SIZE = 512;

async function cropToBlob(imageSrc: string, crop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process the image");

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    OUTPUT_SIZE,
    OUTPUT_SIZE
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not process the image"))),
      "image/jpeg",
      0.9
    );
  });
}

type Props = {
  open: boolean;
  imageSrc: string | null;
  saving?: boolean;
  onClose: () => void;
  onCropped: (blob: Blob) => void;
};

export default function AvatarCropDialog({ open, imageSrc, saving, onClose, onCropped }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaPixels, setAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_: Area, pixels: Area) => setAreaPixels(pixels), []);

  const handleConfirm = async () => {
    if (!imageSrc || !areaPixels) return;
    setProcessing(true);
    try {
      const blob = await cropToBlob(imageSrc, areaPixels);
      onCropped(blob);
    } finally {
      setProcessing(false);
    }
  };

  const busy = processing || saving;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !busy && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Crop your photo</DialogTitle>
          <DialogDescription>
            Drag to reposition and zoom until your face fills the circle.
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-full h-64 bg-secondary/60 rounded-2xl overflow-hidden">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>Zoom</Label>
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.05}
            onValueChange={(v) => setZoom(v[0])}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" className="rounded-2xl" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button className="rounded-2xl" onClick={handleConfirm} disabled={busy || !areaPixels}>
            {busy ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" /> Use photo
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
