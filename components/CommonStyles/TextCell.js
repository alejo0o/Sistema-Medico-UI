import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const TextCell = ({ labelName, info }) => {
  return (
    <>
      <label>
        <strong>{labelName} </strong>
      </label>
      <br />
      <TextareaAutosize
        style={{ width: '100%' }}
        rowsMin={5}
        defaultValue={info}
        disabled
      />
    </>
  );
};

export default TextCell;
