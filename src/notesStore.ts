export function createNotesStore(){
  return {
    cards:  ['A', 'A', 'B', 'B','C', 'C','D', 'D','F', 'F','J', 'J','H', 'H','G', 'G','U', 'U'],
    newLatter: '',
    prevLatter: '',
    mixCards: (array: Array<string>) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
    
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array
    },
  }
}

export type createNotesStoreType = ReturnType<typeof createNotesStore>