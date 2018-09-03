import React from 'react';
import {FormattedMessage} from 'react-intl';
import styles from './loader.css';

import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';

class SaveProjectLoaderComponent extends React.Component {
    constructor (props) {
      super(props);
    }

    render () {
        return (
          <div className={styles.background}>
              <div className={styles.container}>
                  <div className={styles.blockAnimation}>
                      <img
                          className={styles.topBlock}
                          src={topBlock}
                      />
                      <img
                          className={styles.middleBlock}
                          src={middleBlock}
                      />
                      <img
                          className={styles.bottomBlock}
                          src={bottomBlock}
                      />
                  </div>
                  <h1 className={styles.title}>
                      <FormattedMessage
                          defaultMessage="Saving Project..."
                          description="Main loading message"
                          id="custom.gui.loader.savingProject"
                      />
                  </h1>
              </div>
          </div>
        );
    }
}

export default SaveProjectLoaderComponent;
