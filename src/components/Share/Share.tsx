import { useCallback } from 'react';

import useToastNotification from 'hooks/useToastNotification';

import { Button, ButtonProps } from '../Button';
import Icon from '../Icon';
import Toast from '../Toast';
import ToastNotification from '../ToastNotification';

type ShareProps = ButtonProps & {
  title?: string;
  link?: {
    title: string;
    url: string;
  };
  iconOnly?: boolean;
};

export default function Share({
  title = 'Share',
  link,
  iconOnly = true,
  size = 'sm',
  color = 'noborder',
  ...props
}: ShareProps) {
  const { show } = useToastNotification();

  const share = useCallback(async () => {
    try {
      await navigator.share({
        title: link?.title || document.title,
        url: link?.url || window.location.href
      });
      show('success-share');
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        show('error-share');
      }
    }
  }, [link?.title, link?.url, show]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link?.url || window.location.href);
      show('success-copy-to-clipboard');
    } catch (error) {
      show('error-copy-to-clipboard');
    }
  }, [link?.url, show]);

  const handleClick = useCallback(async () => {
    if (typeof navigator.share === 'function') {
      await share();
    } else {
      await copyToClipboard();
    }
  }, [copyToClipboard, share]);

  return (
    <>
      <Button size={size} color={color} onClick={handleClick} {...props}>
        <Icon name="Share" title="Share" />
        {!iconOnly && title}
      </Button>
      <ToastNotification id="success-share" duration={2000}>
        <Toast variant="success" title="Success" description="Link shared!" />
      </ToastNotification>
      <ToastNotification id="error-share" duration={3000}>
        <Toast variant="danger" title="Error" description="Could not share!" />
      </ToastNotification>
      <ToastNotification id="success-copy-to-clipboard" duration={2000}>
        <Toast
          variant="success"
          title="Success"
          description="Link copied to clipboard!"
        />
      </ToastNotification>
      <ToastNotification id="error-copy-to-clipboard" duration={3000}>
        <Toast
          variant="danger"
          title="Error"
          description="Could not copy link to clipboard!"
        />
      </ToastNotification>
    </>
  );
}
