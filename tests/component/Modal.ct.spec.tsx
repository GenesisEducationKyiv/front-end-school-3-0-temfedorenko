import Box from '@mui/material/Box';
import { test, expect } from '@playwright/experimental-ct-react';

import ModalComponent from '../../src/components/Modal';
///////////////////////////////////////////////////////

test.describe('ModalComponent', () => {
  const baseProps = {
    title: 'Test Modal',
    disablePortal: true,
    handleClose: () => {},
    children: <Box data-testid="modal-body">Test Content</Box>,
  };

  const confirmBaseProps = {
    ...baseProps,
    isConfirm: true,
    handleConfirm: () => {},
  };

  test('should render modal with title and content', async ({ mount }) => {
    const component = await mount(<ModalComponent {...baseProps} />);

    await expect(component.getByText('Test Modal')).toBeVisible();
    await expect(component.getByText('Test Content')).toBeVisible();
    await expect(component.getByTestId('modal-body')).toBeVisible();
    await expect(component.getByTestId('modal-error-message')).toBeHidden();
  });

  test('should call handleClose when close button is clicked', async ({ mount }) => {
    let isClosed = false;

    const handleClose = () => isClosed = true;;

    const component = await mount(<ModalComponent {...baseProps} handleClose={handleClose} />);

    const closeButton = component.getByTestId('close-modal');

    await expect(component.getByTestId('close-modal')).toBeVisible();

    expect(isClosed).toBe(false);

    await closeButton.click();

    expect(isClosed).toBe(true);
  });

  test('should render confirmation modal with action buttons if isConfirm is true', async ({ mount }) => {
    const component = await mount(<ModalComponent {...confirmBaseProps} />);

    const confirmButton = component.getByTestId('confirm-delete');
    const cancelButton = component.getByTestId('cancel-delete');

    await expect(component.getByTestId('modal-body')).toBeVisible();

    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toBeEnabled();
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toBeEnabled();
    await expect(confirmButton).toHaveText('Confirm');
  });

  test('should call handleSubmit when confirm button is clicked', async ({ mount }) => {
    let isConfirmed = false;

    const handleConfirm = () => isConfirmed = true;

    const component = await mount(<ModalComponent {...confirmBaseProps} handleConfirm={handleConfirm} />);

    const confirmButton = component.getByTestId('confirm-delete');

    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toBeEnabled();

    expect(isConfirmed).toBe(false);

    await confirmButton.click();

    expect(isConfirmed).toBe(true);
  });

  test('should disable confirm button if isLoading is true', async ({ mount }) => {
    const component = await mount(<ModalComponent {...confirmBaseProps} isLoading={true} />);

    const confirmButton = component.getByTestId('confirm-delete');

    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toBeDisabled();
    await expect(confirmButton).not.toHaveText('Confirm');
  });

  test('should render error message if isError is true', async ({ mount }) => {
    const component = await mount(<ModalComponent {...confirmBaseProps} isError={true} />);

    const error = component.getByTestId('modal-error-message');

    await expect(error).toBeVisible();
  });
});
