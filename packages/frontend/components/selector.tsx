import Select from "react-select"

// light mode only
const customStyles = {
  control: (base, state) => ({
    ...base,
    height: 56,
    minHeight: 56,
    "&:hover": {
      borderColor: 0,
      borderWidth: 2
    },
    boxShadow: state.isFocused ? "#FF8A65" : 0,
    borderColor: state.isFocused ? "#FF8A65" : "rgba(0, 0, 0, .12)",
    borderWidth: state.isFocused ? 2 : 1
  }),
  option: styles => ({
    ...styles,
    backgroundColor: "transparent",
    color: "black",
    "&:hover": {
      backgroundColor: "#FFCCBC"
    }
  })
}

interface Options {
  value: number,
  label: string
}

type props = {
  options: Options[],
  onChange: (event: any) => void,
  hint?: string
}

const Selector: React.FC<props> = props => {

  return (
    <div className="bg-surface max-w-xs undefined relative h-18 my-5">
      <Select
        options={props.options}
        styles={customStyles}
        onChange={props.onChange}
      />
      <p className={props.hint ? `assistiveText text-error w-full` : `invisible`}>
        {props.hint}</p>
    </div>
  )
}

export default Selector
