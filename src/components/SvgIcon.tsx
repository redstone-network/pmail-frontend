import { useMemo } from 'react'

interface SvgIconProps {
  prefix?: string
  name: string
  color?: string
  size?: number | string
}

const SvgIcon = (props: SvgIconProps) => {
  const { prefix = 'icon', name, color = '#fff', size = 16 } = props
  const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name])
  return (
    <svg aria-hidden="true" width={size} height={size} fill={color}>
      <use href={symbolId} fill={color} />
    </svg>
  )
}
export default SvgIcon
