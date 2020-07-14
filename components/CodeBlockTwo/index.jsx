import './index.less';

export default function CodeBlockTwo (props) {
  const { block1, block2 } = props;

  return (
    <div className="m-CodeBlockTwo">
      <div className="m-Block">
        { block1 }
      </div>
      <div className="m-Block">
        { block2 }
      </div>
    </div>
  );
};