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
