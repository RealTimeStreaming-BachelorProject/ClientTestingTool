import React from 'react'
import { useDriverData as useDriverPosition } from './useDriverData'

export default function MapView() {
    const position = useDriverPosition()
    return (
        <div>
            {position}
        </div>
    )
}
