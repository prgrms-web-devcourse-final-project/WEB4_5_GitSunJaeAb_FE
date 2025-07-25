'use client'

import { LayerEditProps } from '@/types/type'
import { ChevronDown, ChevronUp, Layers, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import MarkerEdit from './MarkerEdit'

export default function LayerEdit({
  title,
  defaultOpen = false,
  markers = [],
  deleteMarker,
  onDelete,
  addMarkerByAddress,
}: LayerEditProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [manualMarkers, setManualMarkers] = useState<{ id: number }[]>([])

  const addManualMarker = () => {
    setManualMarkers((prev) => [...prev, { id: Date.now() }])
  }
  const deleteManualMarker = (id: number) => {
    setManualMarkers((prev) => prev.filter((m) => m.id !== id))
  }
  return (
    <>
      <div className="w-full">
        <div
          className={`flex justify-between px-[15px] h-[55px]  cursor-pointer transition-colors ${
            isOpen
              ? 'bg-[#EBF2F2] rounded-t-[5px]'
              : 'bg-[var(--gray-40)] rounded-[5px]'
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex gap-[10px] items-center">
            <Layers
              size={24}
              color={`${isOpen ? 'var(--primary-300)' : 'black'}`}
            />
            <span
              className={`text-[18px] ${
                isOpen ? 'text-[var(--primary-300)]' : 'text-[var(--black)]'
              }`}
            >
              {title}
            </span>
          </div>
          <div className="flex gap-[10px] items-center">
            <Trash2 size={18} color="red" onClick={onDelete} />
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen
              ? 'max-h-[633px] bg-[#EBF2F2] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-[10px] max-h-[633px] overflow-y-auto rounded-b-[5px] flex flex-col gap-[15px]">
            {markers.map((marker) => (
              <MarkerEdit
                key={marker.id}
                isTextArea={true}
                address={marker.address}
                onDelete={() => deleteMarker(title, marker.id)}
                onAddByAddress={(address) => {
                  deleteManualMarker(marker.id)
                  addMarkerByAddress(title, address)
                }}
              />
            ))}

            {manualMarkers.map((m) => (
              <MarkerEdit
                key={m.id}
                isTextArea={true}
                onDelete={() =>
                  setManualMarkers((prev) => prev.filter((x) => x.id !== m.id))
                }
                onAddByAddress={(address) => {
                  setManualMarkers((prev) => prev.filter((x) => x.id !== m.id))
                  addMarkerByAddress(title, address)
                }}
              />
            ))}
            <div
              onClick={addManualMarker}
              className="w-full min-h-[44px] flex justify-center items-center rounded-[5px] bg-[var(--primary-100)] cursor-pointer"
            >
              <Plus size={24} color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
