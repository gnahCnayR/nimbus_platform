"use client"
import { MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type RegionSelectorProps = {
  value: string
  onChange: (value: string) => void
  regions: Array<{
    id: string
    name: string
  }>
}

export default function RegionSelector({ value, onChange, regions }: RegionSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Select region" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region.id} value={region.id}>
            <div className="flex items-center">{region.name}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

