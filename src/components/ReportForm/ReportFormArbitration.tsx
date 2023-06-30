import { useCallback, useState } from 'react';

import { Avatar } from 'ui';

import { useAppSelector } from 'hooks';

import { Button } from '../Button';
import Icon from '../Icon';
import Modal from '../Modal';
import ModalContent from '../ModalContent';
import ModalHeader from '../ModalHeader';
import ModalHeaderHide from '../ModalHeaderHide';
import ModalHeaderTitle from '../ModalHeaderTitle';
import styles from './ReportFormArbitration.module.scss';

function ReportFormArbitration() {
  const [modalVisible, setModalVisible] = useState(false);
  const { imageUrl, title } = useAppSelector(state => state.market.market);

  const handleOpenModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <Button variant="subtle" size="sm" fullwidth onClick={handleOpenModal}>
        <Icon name="Legal" size="lg" />
        Apply for Arbitration
      </Button>
      <Modal
        centered
        className={{ dialog: styles.modalDialog }}
        show={modalVisible}
        onHide={handleCloseModal}
      >
        <ModalContent>
          <ModalHeader>
            <ModalHeaderHide onClick={handleCloseModal} />
            <ModalHeaderTitle className={styles.modalTitle}>
              Request Arbitration
            </ModalHeaderTitle>
          </ModalHeader>
          <div className={styles.modalContent}>
            <div className={styles.modalItem}>
              <p className={styles.modalItemTitleLg}>
                your are contesting the following market
              </p>
              <div className={styles.market}>
                <Avatar $radius="lg" $size="md" alt="Market" src={imageUrl} />
                <p className={styles.marketTitle}>{title}</p>
              </div>
            </div>
            <div className={styles.modalItem}>
              <p className={styles.modalItemTitle}>
                your are contesting the following market
              </p>
            </div>
            <div role="alert" className={styles.alert}>
              <div className={styles.alertBody}>
                <div className={styles.alertHeader}>
                  <Icon name="Warning" size="md" className={styles.alertIcon} />
                  <h3 className={styles.alertTitle}>Attention needed</h3>
                </div>
                <p className={styles.alertDescription}>
                  {`If you believe the declared outcome of this market is
                    incorrect, you have the option to apply for arbitration. By
                    invoking this process, you're requesting a jury to review
                    the decision. Please note, you must be on the Ethereum
                    network to proceed.`}
                </p>
                <a
                  href="//help.polkamarkets.com"
                  aria-label="More Info"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.alertAction}
                >
                  More info
                  <Icon
                    name="Arrow"
                    dir="right"
                    style={{ marginLeft: 'var(--size-4)' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReportFormArbitration;
