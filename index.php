<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
    require('site/layout/header.php');
    require('site/layout/menu.php');
    require('site/sections/main.php');
    require('site/sections/profile.php');
//    require('site/sections/skills.php');
//    require('site/sections/education.php');
//    require('site/sections/experience.php');
    require('site/sections/portfolio.php');
    require('site/sections/contact.php');
    require('site/layout/footer.php');