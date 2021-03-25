const TableCell = ({ labelName, info }) => {
  return (
    <>
      <label>
        <strong>{labelName} </strong>
      </label>
      <p>{info}</p>
    </>
  );
};

export default TableCell;
