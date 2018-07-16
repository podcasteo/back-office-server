export default function (type, slug) {
  // if (item.avatar) {
  //   console.log('ici', item)
  //
  //   return item.avatar
  // }

  return `https://res.cloudinary.com/podcasteo/image/upload/v1/${type}/${slug}/avatar/default`
}
