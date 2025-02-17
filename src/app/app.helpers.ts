import { DocumentData, DocumentSnapshot, GetCollectionResult } from '@capacitor-firebase/firestore';

export const mapIdToObject = <T>(result: GetCollectionResult<DocumentData>): T[] => {
  return result.snapshots.map((snapshot: DocumentSnapshot<DocumentData>) => {
    return { ...(snapshot.data as Partial<T>), id: snapshot.id } as T;
  });
}
