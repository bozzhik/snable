import type {ColorData} from '_scripts/colorsExtractor'
import Unit from '~/UI/Unit'

export default function ColorsUnit({data}: {data: ColorData[] | undefined}) {
  if (!data || data.length === 0) {
    return <Unit token="colors">No colors detected</Unit>
  }

  return (
    <Unit token="colors" className="">
      <div className="flex gap-2">
        {data.slice(0, 5).map(({color}) => (
          <div className="grid place-items-center w-full h-14 rounded-lg" style={{backgroundColor: color}}>
            {/* <div className="text-xs text-gray-700">{color}</div> */}
          </div>
        ))}
      </div>
    </Unit>
  )
}
