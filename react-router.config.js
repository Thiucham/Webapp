export default {
  ssr: false,
  appDirectory: "src",
  basename: "/Webapp/",
  async prerender() {
    const collections = [
      { name: "Luisan", count: 200 },
      { name: "Hiuna-Khomlui", count: 302 },
      { name: "Khristen-Madui-Lui", count: 448 },
    ];

    const paths = [
      "/",
      "/sign-in",
      "/Favourites/list",
    ];

    for (const col of collections) {
      paths.push(`/${col.name}/list`);
      paths.push(`/${col.name}/categories`);
      for (let i = 1; i <= col.count; i++) {
        paths.push(`/${col.name}/list/${i}`);
        paths.push(`/${col.name}/categories/${i}`);
      }
    }

    return paths;
  },
};
