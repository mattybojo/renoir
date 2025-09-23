import { DocumentData, DocumentSnapshot, FirebaseFirestore, GetCollectionResult } from '@capacitor-firebase/firestore';

export const mapIdToObject = <T>(result: GetCollectionResult<DocumentData>): T[] => {
  return result.snapshots.map((snapshot: DocumentSnapshot<DocumentData>) => {
    return { ...(snapshot.data as Partial<T>), id: snapshot.id } as T;
  });
}

export const uploadData = (reference: string, items: any[]): Promise<void> => {
  const promises: Promise<any>[] = [];
  items.forEach(data => {
    promises.push(FirebaseFirestore.addDocument({ reference, data }));
  });

  return Promise.all(promises).then(() => console.log(`Completed uploading ${reference}`));
};

export const getLocalISOString = (): string => {
  const now = new Date();

  // Get the timezone offset in minutes and convert to milliseconds
  const timezoneOffsetMs = now.getTimezoneOffset() * 60 * 1000;

  // Create a new Date object adjusted to local time
  const localDate = new Date(now.getTime() - timezoneOffsetMs);

  // Get the ISO string, which will now represent the local time
  // Remove the 'Z' and any milliseconds if desired for a standard ISO 8601 local representation
  return localDate.toISOString().slice(0, -5); // Removes milliseconds and 'Z'
}
