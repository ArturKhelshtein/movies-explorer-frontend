import React from 'react';

import './DownloadMore.css';

import Button from '../Button/Button';

function DownloadMore({ isVisibleButtonDownloads, handleDownloadMore }) {
  return (
    <div className={`download-more ${ isVisibleButtonDownloads ? '' : 'download-more_no'}`}>
      <Button
        type="download-more"
        buttonName="Ещё"
        onClick={handleDownloadMore}
      />
    </div>
  );
}

export default DownloadMore;
