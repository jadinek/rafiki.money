import * as React from 'react'

enum type {
  solid = 'solid',
  outline = 'outline',
  text = 'text'
}

type props = {
  type: string
  to: string
  bgColour?: string
  textColour?: string
  disabled?: boolean
  onTap: (event: any) => void
}

const Button: React.FC<props> = (props) => {
  let className: string = 'button min-w-64 py-2 px-4 rounded focus:outline-none '
  if (props.type === type.solid) {
    className += props.disabled ? `text-surface bg-on-surface opacity-38` : `bg-${props.bgColour || 'primary'} text-${props.textColour || 'on-surface'} elevation-2 hover:elevation-3 active:elevation-6`
  } else if (props.type === type.outline) {
    className += props.disabled ? `border border-on-surface bg-transparent opacity-38 text-on-surface` : `border border-${props.bgColour || 'primary'} text-${props.textColour || 'primary'} hover:bg-${props.bgColour || 'primary'}-100 active:bg-${props.bgColour || 'primary'}-200`
  } else if (props.type === type.text) {
    className += props.disabled ? `opacity-38 text-on-surface` : `text-${props.textColour || 'primary'} hover:bg-${props.bgColour || 'primary'}-100 active:bg-${props.bgColour || 'primary'}-200`
  } else {
    throw new Error('Not a supported button type.')
  }
  return (
    <button onClick={props.disabled ? () => {} : props.onTap } className={className}>
      { props.children }
    </button>
  )
}

export default Button