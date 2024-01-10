import { useCallback, useMemo, useState } from 'react';

import classNames from 'classnames';
import { ui } from 'config';
import isEmpty from 'lodash/isEmpty';
import { Avatar } from 'ui';

import { Button } from 'components/Button';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderHide from 'components/ModalHeaderHide';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ModalSectionText from 'components/ModalSectionText';

import styles from './Onboarding.module.scss';
import { buildOnboardingSteps } from './Onboarding.utils';

const ARIA = {
  'aria-labelledby': 'onboarding-modal-name',
  'aria-describedby': 'onboarding-modal-description'
} as const;

function Onboarding() {
  const [show, setShow] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  const onboardingSteps = useMemo(
    () => buildOnboardingSteps(ui.layout.onboarding.steps),
    []
  );

  if (isEmpty(onboardingSteps)) return null;

  const hasAtLeastOneImage = onboardingSteps.some(
    ({ imageUrl }) => imageUrl !== null
  );

  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const { title, description, imageUrl } = step;

  return (
    <Modal show={show} centered size="sm" onHide={handleHide}>
      <ModalContent>
        <ModalHeader>
          <ModalHeaderHide onClick={handleHide} />
          <div className={styles.header}>
            {imageUrl ? (
              <Avatar $size="md" $radius="lg" src={imageUrl} alt={title} />
            ) : (
              <>
                {hasAtLeastOneImage ? (
                  <div style={{ height: 64, width: 64 }} />
                ) : (
                  <div style={{ height: 27, width: '100%' }} />
                )}
              </>
            )}
          </div>
          <ModalHeaderTitle
            id={ARIA['aria-labelledby']}
            className={classNames(styles.title, 'pm-c-modal__header-title')}
          >
            {title}
          </ModalHeaderTitle>
        </ModalHeader>
        <ModalSection>
          <ModalSectionText
            id={ARIA['aria-describedby']}
            className={classNames(
              styles.description,
              'pm-c-modal__section-description'
            )}
          >
            {description}
          </ModalSectionText>
        </ModalSection>
        <ModalFooter className={styles.footer}>
          {onboardingSteps.length > 1 ? (
            <div className={styles.steps}>
              {onboardingSteps.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  className={classNames(
                    'pm-c-button',
                    'pm-c-button-normal--noborder',
                    styles.stepsItem,
                    {
                      [styles.stepsItemActive]: index === currentStep
                    }
                  )}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>
          ) : null}
          <Button
            size="sm"
            color="primary"
            fullwidth
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            {isLastStep ? "Let's Go" : 'Next'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Onboarding;
