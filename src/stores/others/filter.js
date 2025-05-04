export const filter = (filteringText, tab, array) => {
  if (filteringText && tab && array) {
    const lowercasedSearch = filteringText.value?.toLowerCase()
    switch (tab) {
      case 'Hisob':
        return array.filter(
          (item) =>
            item.name?.toLowerCase().includes(lowercasedSearch) ||
            item.lname?.toLowerCase().includes(lowercasedSearch) ||
            item.email?.toLowerCase().includes(lowercasedSearch),
        )
      case 'Post':
        return array.filter((item) => item.title?.trim().toLowerCase().includes(lowercasedSearch))
      case 'Hashtag':
        return array.filter((item) => item.name?.toLowerCase().includes(lowercasedSearch))
      default:
        break
    }
  }
}
