export const getTags = songData => {
  return songData.tag_list.map(song => song.all_tags.document)
}
