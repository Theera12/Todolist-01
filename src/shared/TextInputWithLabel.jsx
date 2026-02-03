import styled from 'styled-components';
function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
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
      ></Input>
    </>
  );
}
export default TextInputWithLabel;
