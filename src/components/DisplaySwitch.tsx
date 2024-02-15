'use client'

import BarsIcon from "@/components/BarsIcon"
import SquaresIcon from "@/components/SquaresIcon"
import { DisplayMode } from "@/types/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Button from "./Button"

type DisplaySwitchProps = {
  displayMode: DisplayMode
}

export default function DisplaySwitch({ displayMode }: DisplaySwitchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function updateDisplayMode(newDisplayMode: DisplayMode) {
    const params = new URLSearchParams(searchParams);

    params.set('display', newDisplayMode);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="md:flex gap-2 hidden">
      <Button dataTestId="list-icon" variant={displayMode === 'list' ? 'primary' : 'secondary' } onClick={() => updateDisplayMode('list')}>
        <BarsIcon />
      </Button>
      <Button dataTestId="grid-icon" variant={displayMode === 'grid' ? 'primary' : 'secondary' } onClick={() => updateDisplayMode('grid')}>
        <SquaresIcon />
      </Button>
    </div>
  )
}