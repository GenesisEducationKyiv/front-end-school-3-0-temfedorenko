import { test, expect, type Page } from '@playwright/test';
///////////////////////////////////////////////////////

test.describe('Create Track', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  const testIds = {
    trackForm: 'track-form',
    modalTitle: 'modal-title',
    inputTitle: 'input-title',
    inputAlbum: 'input-album',
    errorGenre: 'error-genre',
    errorTitle: 'error-title',
    inputArtist: 'input-artist',
    errorArtist: 'error-artist',
    submitButton: 'submit-button',
    cancelButton: 'cancel-button',
    genreSelector: 'genre-selector',
    errorCoverImage: 'error-coverImage',
    inputCoverImage: 'input-cover-image',
    createTrackButton: 'create-track-button',
  };

  async function openCreateTrackModal(page: Page) {
    await page.getByTestId(testIds.createTrackButton).click();

    await expect(page.getByTestId(testIds.trackForm)).toBeVisible();
    await expect(page.getByTestId(testIds.modalTitle)).toBeVisible();
  }

  test('should render the home page with the create track button', async ({ page }) => {
    await expect(page).toHaveTitle('Track Management');
    await expect(page.getByTestId(testIds.createTrackButton)).toHaveText('Create Track');
  });

  test('should open the create track modal with inputs and buttons', async ({ page }) => {
    await expect(page.getByTestId(testIds.trackForm)).toBeHidden();
    await expect(page.getByTestId(testIds.modalTitle)).toBeHidden();
    
    await openCreateTrackModal(page);

    await expect(page.getByTestId(testIds.inputTitle)).toBeVisible();
    await expect(page.getByTestId(testIds.inputAlbum)).toBeVisible();
    await expect(page.getByTestId(testIds.inputArtist)).toBeVisible();
    await expect(page.getByTestId(testIds.genreSelector)).toBeVisible();
    await expect(page.getByTestId(testIds.inputCoverImage)).toBeVisible();

    await expect(page.getByTestId(testIds.submitButton)).toBeVisible();
  });

  test('should show the valitadion errors when submitting form with empty fields', async ({ page }) => {
    await openCreateTrackModal(page);

    const submitButton = page.getByTestId(testIds.submitButton);

    await submitButton.click();

    await expect(page.getByTestId(testIds.errorTitle)).toBeVisible();
    await expect(page.getByTestId(testIds.errorGenre)).toBeVisible();
    await expect(page.getByTestId(testIds.errorArtist)).toBeVisible();
  });

  test('should show the valitadion error when coverImage is an invalid url', async ({ page }) => {
    await openCreateTrackModal(page);

    await page.getByTestId(testIds.inputCoverImage).fill('invalid url');

    const submitButton = page.getByTestId(testIds.submitButton);

    await submitButton.click();

    const errorMsg = page.getByTestId(testIds.errorCoverImage);

    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Should be a valid URL');
  });

  test('should create a new track, close the modal and show it in the list', async ({ page }) => {
    const randomSuffix = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

    await openCreateTrackModal(page);

    const submitButton = page.getByTestId(testIds.submitButton);

    await page.getByTestId(testIds.inputAlbum).fill('test album');
    await page.getByTestId(testIds.inputArtist).fill('test artist');
    await page.getByTestId(testIds.inputTitle).fill(`test title ${randomSuffix}`);

    await page.getByTestId(testIds.genreSelector).click();
    await page.getByRole('option', { name: 'Rock' }).click();

    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/tracks') && resp.status() === 201),
      submitButton.click(),
    ]);

    await expect(page.getByTestId(testIds.trackForm)).toBeHidden();
    await expect(page.getByText(`test title ${randomSuffix}`)).toBeVisible();
  });

  test('should cancel track creation and close the modal without adding a new track', async ({ page }) => {
    const randomSuffix = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const testTitle = `test title ${randomSuffix}`;

    await openCreateTrackModal(page);

    await page.getByTestId(testIds.inputTitle).fill(testTitle);
    await page.getByTestId(testIds.inputAlbum).fill('test album');
    await page.getByTestId(testIds.inputArtist).fill('test artist');

    await page.getByTestId(testIds.cancelButton).click();

    await expect(page.getByText(testTitle)).toHaveCount(0);
    await expect(page.getByTestId(testIds.trackForm)).toBeHidden();
  });
});
