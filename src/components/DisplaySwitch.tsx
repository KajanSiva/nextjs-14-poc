'use client'

import BarsIcon from "@/components/BarsIcon"
import SquaresIcon from "@/components/SquaresIcon"
import { DisplayMode } from "@/types/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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
    <div className="flex gap-2">
      <div className={displayMode === 'list' ? 'bg-slate-400' : '' } onClick={() => updateDisplayMode('list')}>
        <BarsIcon />
      </div>
      <div className={displayMode === 'grid' ? 'bg-slate-400' : '' } onClick={() => updateDisplayMode('grid')}>
        <SquaresIcon />
      </div>
    </div>
  )
}