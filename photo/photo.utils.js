export const processHashtag = (caption) => {
    const hashtag = caption.match(/#[\w]+/g) || []// hash 태그 뽑아내기 caption에서
    return hashtag.map((hashtag) => ({ where: { hashtag }, create: { hashtag } }))

}
