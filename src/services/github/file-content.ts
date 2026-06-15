export async function getFileContent(
  downloadUrl: string
) {
  const response =
    await fetch(downloadUrl);

  if (!response.ok) {
    return "";
  }

  return response.text();
}