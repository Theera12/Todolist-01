import styled from 'styled-components';
const Label = styled.label`
  margin: 3px;
`;
const Input = styled.input`
  margin: 0;
  padding: 2px;
  height: 17px;
  border: 1px solid grey;
  border-radius: 10%;
  font-style: italic;
  &:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.94);
  }
  &:focus {
    outline: none;
  }
`;
function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <>
      <Label htmlFor={elementId}>{label}</Label>
      <Input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder="Enter Your Todo..."
      />
    </>
  );
}
export default TextInputWithLabel;
