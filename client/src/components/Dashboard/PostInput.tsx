interface InputInterface {
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const PostInput = ({ inputValue, setInputValue }: InputInterface) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    const lettersAndSpacesOnly = inputValue.replace(/[^a-z ]/gi, "") || "" // Provide a default value of an empty string
    setInputValue(lettersAndSpacesOnly.toLowerCase())
  }

  return (
    <div className="grid grid-cols-1 gap-2 w-full">
      <label htmlFor="cipher-input" className="text-gray-700">
        Create a post
      </label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="text"
        id="cipher-input"
        name="cipher-input"
        onChange={handleInput}
        value={inputValue}
        minLength={1}
        maxLength={25}
        required
      />
    </div>
  )
}
export default PostInput
