<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/de">
        <img
          src="../assets/logos/public_src_assets_THD.png"
          class="img-brand"
          alt="Responsive image"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          class="navbar-nav nav-pills nav-fill nav-justified me-auto mb-2 mb-lg-0"
          role="tabpanel"
        >
          <li class="nav-item btn btn-outline-success mx-1 align-self-center w-100 mb-1">
            <router-link to="/" class="nav-link" aria-current="page">
              Home
            </router-link>
            <!--vue link instead of the anchor-->
          </li>
          <li class="nav-item btn btn-outline-success mx-1 align-self-center w-100 mb-1">
            <router-link to="/SickForm" class="nav-link"
              >Krakmelden</router-link
            >
          </li>
          <li class="nav-item btn btn-outline-success mx-1 align-self-center w-100 mb-1">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
           <li class="nav-item btn btn-outline-success mx-1 align-self-center w-100 mb-1 text-nowrap">
            <router-link to="/CoronaStat" class="nav-link">Covid-19</router-link>
          </li>
          <!-- <li class="nav-item dropdown btn btn-outline-success mx-1">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
          <!-- <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >Disabled</a
            >
          </li> -->
        </ul>
        <!-- <form class="d-flex ml-auto">
          <input
            class="form-control me-2 d-flex"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success mx-1" type="submit">
            Search
          </button>
        </form> -->
      </div>
    </div>
  </nav>
</template>

<style>
@media (max-width: 1300px) {
  .img-brand {
    transform: scale(0.7);
    margin-left: -30px;
  }
}
.img-brand {
  max-width: 380px !important;
  display: block;
  transform: scale(0.7);
}
.navbar {
  background-color: rgba(0, 0, 0, 0.6);
}
/* if the windows is small the navbar will not be fixed top any more */
@media (max-width: 1000px) {
  .fixed-top {
    position: relative !important;
  }
  li {
    width: 100%;
    margin: 5px;
    padding: 0px;
  }
}
</style>
<script>
export default {
  // methods: {
  //   isfixedtop: () => {
  //     if (window.innerWidth < 991) { return false } else { return true }
  //   }
  // }
}
</script>
