


const InputForm = ({
    placeholder,
    handleChange,
    value,
    fieldName
}) => {
    return (
        <input 
            type="text" 
            placeholder={placeholder} 
            onChange={(e) => handleChange(e, fieldName)}
            value={value}>
        </input>
    )
}

export default InputForm;