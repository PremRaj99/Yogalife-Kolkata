const galleryData = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1663040225613-98b7801c48a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Winter Morning Walk",
    date: "05-01-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Snowy Landscape",
    date: "12-01-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616512659455-111d3367649f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Hot Coffee in Winter",
    date: "18-01-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cozy Fireplace",
    date: "22-01-2025",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1681400633393-b7d619e5bca6?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "New Year Celebrations",
    date: "30-01-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1599725427295-6ed79ff8dbef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Valentine's Day Setup",
    date: "05-02-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611941671018-6c3907cb7a76?q=80&w=2140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Spring Bloom",
    date: "11-02-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1610962381137-50ef93055125?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Romantic Dinner",
    date: "17-02-2025",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1681505336207-cea25b6cf0ea?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Sunset by the Lake",
    date: "28-02-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Holi Festival",
    date: "07-03-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1620003048292-c4db88559488?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cherry Blossom Season",
    date: "15-03-2025",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1681494382914-a0f75d8b94be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Camping in the Forest",
    date: "25-03-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1728206348193-9b5ae74a7d32?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Beach Picnic",
    date: "02-04-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1629528026812-046ce5f40936?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Spring Rain",
    date: "14-04-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1652620364162-4c0a3387a0f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Sunrise in the Hills",
    date: "27-04-2025",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1683121640418-4ea401bb42dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Summer Vacation Begins",
    date: "10-05-2025",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1683121640418-4ea401bb42dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Road Trip Adventure",
    date: "18-05-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616964361016-4dadd4cc67ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Evening in the Countryside",
    date: "04-06-2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543505298-b8be9b52a21a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Monsoon Vibes",
    date: "19-06-2025",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1683141004482-52cd4940edc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Going to School",
    date: "22-06-2025",
  },
];

const categorizedGalleryData = galleryData.reduce((acc, item) => {
  const [day, month, year] = item.date.split("-");
  const key = `${month}-${year}`;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(item);
  return acc;
}, {});

export { categorizedGalleryData };
