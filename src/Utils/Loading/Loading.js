import './Loading.scss';

function Loading() {
  // return (
  //   <div className="chaotic-orbit" />
  // );

  return (
    <div className="bookshelf_wrapper">
      <ul className="books_list">
        <li className="book_item first"></li>
        <li className="book_item second"></li>
        <li className="book_item third"></li>
        <li className="book_item fourth"></li>
        <li className="book_item fifth"></li>
        <li className="book_item sixth"></li>
      </ul>
      <div className="shelf"></div>
      <div className="loadingBook-text"> lecture en cours ...</div>
    </div>
  );
  
}

export default Loading;
