import React from 'react';

import './DownloadMore.css';

import Button from '../Button/Button';

const DownloadMore = () => {
  function handleDownloadMore() {
    return console.log('Загрузить еще! (заглушка)');
  }

  return (
    <div className="download-more">
      <Button
        type="download-more"
        buttonName="Ещё"
        onClick={handleDownloadMore}
      />
    </div>
  );
};

export default DownloadMore;
