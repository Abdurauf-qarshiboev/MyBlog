/**
 * Get liked state for blogs from localStorage.
 * @returns {Object} - An object containing liked states with blog IDs as keys.
 */
export const getLikesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('blogLikes')) || {}
}

/**
 * Update the liked state for a specific blog in localStorage.
 * @param {String} blogId - The blog ID to update.
 * @param {Boolean} isLiked - The new liked state.
 */
export const updateLikesInLocalStorage = (blogId, isLiked) => {
  const likes = getLikesFromLocalStorage()
  likes[blogId] = isLiked
  localStorage.setItem('blogLikes', JSON.stringify(likes))
}
