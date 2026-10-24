import Image from "next/image";
import type { YogaProgramId } from "@/lib/yoga-programs";

// Decorative card artwork; the card title and description carry the meaning.
export function ProgramIllustration({ kind }: { kind: YogaProgramId }) {
  return <Image
    src={`/images/programs/${kind}.png`}
    alt=""
    fill
    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
    className="bento-art-image"
  />;
}
