<template>
  <footer class="footer mt-auto">
    <div class="container">
      <p class="text-center">
        © 2020 |
        <a>Technische Hochschule Deggendorf</a> |
        <a href="#">Impressum</a> |
        <a href="#">Datenschutz</a> |
        <a href="#">Barrierefreiheit Erklärung</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss">

footer {
  width: 100%;
  background-color: var(--gray-dark);
  padding: 10px 0px 5px 0px;
}
footer p {
  font-size: 13px;
  color: #ccc;
  padding-bottom: 0px;
  margin: 4px 0 0 0;
}
a,
a:link,
a:focus,
a:active,
a:visited {
  outline: 0;
}
footer a {
  color: white;
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

</style>
