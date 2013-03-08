
-- *** STRUCTURE:`tbl_fields_author` ***
DROP TABLE IF EXISTS`tbl_fields_author`;
CREATE TABLE`tbl_fields_author` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `allow_multiple_selection` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `default_to_current_user` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL,
  `author_types` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_author` ***

-- *** STRUCTURE:`tbl_fields_checkbox` ***
DROP TABLE IF EXISTS`tbl_fields_checkbox`;
CREATE TABLE`tbl_fields_checkbox` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `default_state` enum('on','off') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'on',
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_checkbox` ***
INSERT INTO`tbl_fields_checkbox` (`id`, `field_id`, `default_state`, `description`) VALUES (2, 17, 'on', NULL);

-- *** STRUCTURE:`tbl_fields_date` ***
DROP TABLE IF EXISTS`tbl_fields_date`;
CREATE TABLE`tbl_fields_date` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `pre_populate` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_date` ***

-- *** STRUCTURE:`tbl_fields_datetime` ***
DROP TABLE IF EXISTS`tbl_fields_datetime`;
CREATE TABLE`tbl_fields_datetime` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `prepopulate` tinyint(1) DEFAULT '1',
  `time` tinyint(1) DEFAULT '1',
  `multiple` tinyint(1) DEFAULT '1',
  `range` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_datetime` ***

-- *** STRUCTURE:`tbl_fields_input` ***
DROP TABLE IF EXISTS`tbl_fields_input`;
CREATE TABLE`tbl_fields_input` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `validator` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_input` ***
INSERT INTO`tbl_fields_input` (`id`, `field_id`, `validator`) VALUES (1, 6, NULL);
INSERT INTO`tbl_fields_input` (`id`, `field_id`, `validator`) VALUES (4, 11, NULL);

-- *** STRUCTURE:`tbl_fields_number` ***
DROP TABLE IF EXISTS`tbl_fields_number`;
CREATE TABLE`tbl_fields_number` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_number` ***

-- *** STRUCTURE:`tbl_fields_order_entries` ***
DROP TABLE IF EXISTS`tbl_fields_order_entries`;
CREATE TABLE`tbl_fields_order_entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `force_sort` enum('yes','no') DEFAULT 'no',
  `hide` enum('yes','no') DEFAULT 'no',
  PRIMARY KEY (`id`),
  UNIQUE KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- *** DATA:`tbl_fields_order_entries` ***
INSERT INTO`tbl_fields_order_entries` (`id`, `field_id`, `force_sort`, `hide`) VALUES (3, 13, 'yes', 'no');

-- *** STRUCTURE:`tbl_fields_publish_tabs` ***
DROP TABLE IF EXISTS`tbl_fields_publish_tabs`;
CREATE TABLE`tbl_fields_publish_tabs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- *** DATA:`tbl_fields_publish_tabs` ***
INSERT INTO`tbl_fields_publish_tabs` (`id`, `field_id`) VALUES (8, 10);
INSERT INTO`tbl_fields_publish_tabs` (`id`, `field_id`) VALUES (9, 15);

-- *** STRUCTURE:`tbl_fields_referencelink` ***
DROP TABLE IF EXISTS`tbl_fields_referencelink`;
CREATE TABLE`tbl_fields_referencelink` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `related_field_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `limit` int(4) unsigned NOT NULL DEFAULT '20',
  `field_type` enum('select','autocomplete') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'select',
  `allow_multiple_selection` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `show_association` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_referencelink` ***

-- *** STRUCTURE:`tbl_fields_select` ***
DROP TABLE IF EXISTS`tbl_fields_select`;
CREATE TABLE`tbl_fields_select` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `allow_multiple_selection` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `show_association` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  `sort_options` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `static_options` text COLLATE utf8_unicode_ci,
  `dynamic_options` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_select` ***

-- *** STRUCTURE:`tbl_fields_selectbox_link` ***
DROP TABLE IF EXISTS`tbl_fields_selectbox_link`;
CREATE TABLE`tbl_fields_selectbox_link` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `allow_multiple_selection` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `show_association` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  `related_field_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `limit` int(4) unsigned NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_selectbox_link` ***

-- *** STRUCTURE:`tbl_fields_subsectionmanager` ***
DROP TABLE IF EXISTS`tbl_fields_subsectionmanager`;
CREATE TABLE`tbl_fields_subsectionmanager` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `subsection_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `filter_tags` text COLLATE utf8_unicode_ci,
  `caption` text COLLATE utf8_unicode_ci,
  `droptext` text COLLATE utf8_unicode_ci,
  `create` tinyint(1) DEFAULT '1',
  `remove` tinyint(1) DEFAULT '1',
  `allow_multiple` tinyint(1) DEFAULT '1',
  `edit` tinyint(1) DEFAULT '1',
  `sort` tinyint(1) DEFAULT '1',
  `drop` tinyint(1) DEFAULT '1',
  `show_search` tinyint(1) DEFAULT '1',
  `show_preview` tinyint(1) DEFAULT '0',
  `recursion_levels` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_subsectionmanager` ***
INSERT INTO`tbl_fields_subsectionmanager` (`id`, `field_id`, `subsection_id`, `filter_tags`, `caption`, `droptext`, `create`, `remove`, `allow_multiple`, `edit`, `sort`, `drop`, `show_search`, `show_preview`, `recursion_levels`) VALUES (5, 9, 2, NULL, '{$title}<br /> <em>{$image}</em>', NULL, 1, 1, 0, 1, 1, 0, 1, 1, 1);
INSERT INTO`tbl_fields_subsectionmanager` (`id`, `field_id`, `subsection_id`, `filter_tags`, `caption`, `droptext`, `create`, `remove`, `allow_multiple`, `edit`, `sort`, `drop`, `show_search`, `show_preview`, `recursion_levels`) VALUES (6, 14, 2, NULL, '{$title}<br /> <em>{$image}</em>', NULL, 1, 1, 0, 1, 1, 0, 1, 1, 1);

-- *** STRUCTURE:`tbl_fields_subsectiontabs` ***
DROP TABLE IF EXISTS`tbl_fields_subsectiontabs`;
CREATE TABLE`tbl_fields_subsectiontabs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `subsection_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `static_tabs` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_subsectiontabs` ***

-- *** STRUCTURE:`tbl_fields_taglist` ***
DROP TABLE IF EXISTS`tbl_fields_taglist`;
CREATE TABLE`tbl_fields_taglist` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `validator` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pre_populate_source` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`),
  KEY `pre_populate_source` (`pre_populate_source`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_taglist` ***

-- *** STRUCTURE:`tbl_fields_textarea` ***
DROP TABLE IF EXISTS`tbl_fields_textarea`;
CREATE TABLE`tbl_fields_textarea` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `formatter` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` int(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_textarea` ***
INSERT INTO`tbl_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (15, 2, 'ckeditor', 8);
INSERT INTO`tbl_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (16, 3, 'ckeditor', 8);
INSERT INTO`tbl_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (17, 4, 'ckeditor', 8);
INSERT INTO`tbl_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (18, 5, 'ckeditor', 8);
INSERT INTO`tbl_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (24, 8, 'ckeditor', 15);
INSERT INTO`tbl_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (25, 12, 'ckeditor', 10);
INSERT INTO`tbl_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (26, 16, 'ckeditor', 25);

-- *** STRUCTURE:`tbl_fields_uniqueupload` ***
DROP TABLE IF EXISTS`tbl_fields_uniqueupload`;
CREATE TABLE`tbl_fields_uniqueupload` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `destination` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `validator` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_uniqueupload` ***
INSERT INTO`tbl_fields_uniqueupload` (`id`, `field_id`, `destination`, `validator`) VALUES (1, 7, '/workspace/uploads/images', '/\\.(?:bmp|gif|jpe?g|png)$/i');

-- *** STRUCTURE:`tbl_fields_upload` ***
DROP TABLE IF EXISTS`tbl_fields_upload`;
CREATE TABLE`tbl_fields_upload` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `destination` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `validator` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_fields_upload` ***

-- *** STRUCTURE:`tbl_entries_data_10` ***
DROP TABLE IF EXISTS`tbl_entries_data_10`;
CREATE TABLE`tbl_entries_data_10` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- *** DATA:`tbl_entries_data_10` ***
INSERT INTO`tbl_entries_data_10` (`id`, `entry_id`, `value`) VALUES (8, 4, NULL);
INSERT INTO`tbl_entries_data_10` (`id`, `entry_id`, `value`) VALUES (9, 6, NULL);

-- *** STRUCTURE:`tbl_entries_data_11` ***
DROP TABLE IF EXISTS`tbl_entries_data_11`;
CREATE TABLE`tbl_entries_data_11` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `handle` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  KEY `handle` (`handle`),
  KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_11` ***
INSERT INTO`tbl_entries_data_11` (`id`, `entry_id`, `handle`, `value`) VALUES (8, 4, 'sample-deal', 'Sample Deal');
INSERT INTO`tbl_entries_data_11` (`id`, `entry_id`, `handle`, `value`) VALUES (9, 6, 'sample-deal-2', 'Sample Deal 2');

-- *** STRUCTURE:`tbl_entries_data_12` ***
DROP TABLE IF EXISTS`tbl_entries_data_12`;
CREATE TABLE`tbl_entries_data_12` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_12` ***
INSERT INTO`tbl_entries_data_12` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (8, 4, '<p><strong>5</strong> nights<strong>&#160;</strong>in</p>\r\n\r\n<h2>Dubai</h2>\r\n\r\n<p>for <strong>&#163;999</strong></p>\r\n\r\n<p><em>you know you want to!</em></p>\r\n', '<p><strong>5</strong> nights<strong>&#160;</strong>in</p>\r\n\r\n<h2>Dubai</h2>\r\n\r\n<p>for <strong>&#163;999</strong></p>\r\n\r\n<p><em>you know you want to!</em></p>\r\n');
INSERT INTO`tbl_entries_data_12` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (9, 6, '<p><strong>7</strong> nights<strong>&#160;</strong>in</p>\r\n\r\n<h2>Los Angeles</h2>\r\n\r\n<p>for <strong>&#163;999</strong></p>\r\n\r\n<p><em>you know you want to!</em></p>\r\n', '<p><strong>7</strong> nights<strong>&#160;</strong>in</p>\r\n\r\n<h2>Los Angeles</h2>\r\n\r\n<p>for <strong>&#163;999</strong></p>\r\n\r\n<p><em>you know you want to!</em></p>\r\n');

-- *** STRUCTURE:`tbl_entries_data_13` ***
DROP TABLE IF EXISTS`tbl_entries_data_13`;
CREATE TABLE`tbl_entries_data_13` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- *** DATA:`tbl_entries_data_13` ***
INSERT INTO`tbl_entries_data_13` (`id`, `entry_id`, `value`) VALUES (8, 4, 1);
INSERT INTO`tbl_entries_data_13` (`id`, `entry_id`, `value`) VALUES (9, 6, 2);

-- *** STRUCTURE:`tbl_entries_data_14` ***
DROP TABLE IF EXISTS`tbl_entries_data_14`;
CREATE TABLE`tbl_entries_data_14` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `relation_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `relation_id` (`relation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_14` ***
INSERT INTO`tbl_entries_data_14` (`id`, `entry_id`, `relation_id`) VALUES (8, 4, 2);
INSERT INTO`tbl_entries_data_14` (`id`, `entry_id`, `relation_id`) VALUES (9, 6, 5);

-- *** STRUCTURE:`tbl_entries_data_15` ***
DROP TABLE IF EXISTS`tbl_entries_data_15`;
CREATE TABLE`tbl_entries_data_15` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- *** DATA:`tbl_entries_data_15` ***
INSERT INTO`tbl_entries_data_15` (`id`, `entry_id`, `value`) VALUES (8, 4, NULL);
INSERT INTO`tbl_entries_data_15` (`id`, `entry_id`, `value`) VALUES (9, 6, NULL);

-- *** STRUCTURE:`tbl_entries_data_16` ***
DROP TABLE IF EXISTS`tbl_entries_data_16`;
CREATE TABLE`tbl_entries_data_16` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_16` ***
INSERT INTO`tbl_entries_data_16` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (8, 4, '<h1>Have the time of your life!</h1>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.&#160;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<h1>Have the time of your life!</h1>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.&#160;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');
INSERT INTO`tbl_entries_data_16` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (9, 6, '<h1>Have the time of your life!</h1>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.&#160;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<h1>Have the time of your life!</h1>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.&#160;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE:`tbl_entries_data_17` ***
DROP TABLE IF EXISTS`tbl_entries_data_17`;
CREATE TABLE`tbl_entries_data_17` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_17` ***
INSERT INTO`tbl_entries_data_17` (`id`, `entry_id`, `value`) VALUES (8, 4, 'yes');
INSERT INTO`tbl_entries_data_17` (`id`, `entry_id`, `value`) VALUES (9, 6, 'yes');

-- *** STRUCTURE:`tbl_entries_data_2` ***
DROP TABLE IF EXISTS`tbl_entries_data_2`;
CREATE TABLE`tbl_entries_data_2` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_2` ***
INSERT INTO`tbl_entries_data_2` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE:`tbl_entries_data_3` ***
DROP TABLE IF EXISTS`tbl_entries_data_3`;
CREATE TABLE`tbl_entries_data_3` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_3` ***
INSERT INTO`tbl_entries_data_3` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE:`tbl_entries_data_4` ***
DROP TABLE IF EXISTS`tbl_entries_data_4`;
CREATE TABLE`tbl_entries_data_4` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_4` ***
INSERT INTO`tbl_entries_data_4` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE:`tbl_entries_data_5` ***
DROP TABLE IF EXISTS`tbl_entries_data_5`;
CREATE TABLE`tbl_entries_data_5` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_5` ***
INSERT INTO`tbl_entries_data_5` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE:`tbl_entries_data_6` ***
DROP TABLE IF EXISTS`tbl_entries_data_6`;
CREATE TABLE`tbl_entries_data_6` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `handle` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  KEY `handle` (`handle`),
  KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_6` ***
INSERT INTO`tbl_entries_data_6` (`id`, `entry_id`, `handle`, `value`) VALUES (1, 2, 'sample', 'Sample ');
INSERT INTO`tbl_entries_data_6` (`id`, `entry_id`, `handle`, `value`) VALUES (2, 5, 'sample-mountain', 'Sample Mountain');

-- *** STRUCTURE:`tbl_entries_data_7` ***
DROP TABLE IF EXISTS`tbl_entries_data_7`;
CREATE TABLE`tbl_entries_data_7` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` int(11) unsigned DEFAULT NULL,
  `mimetype` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  KEY `file` (`file`),
  KEY `mimetype` (`mimetype`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_7` ***
INSERT INTO`tbl_entries_data_7` (`id`, `entry_id`, `file`, `size`, `mimetype`, `meta`) VALUES (1, 2, '/uploads/images/space-starts-galaxy-shuttersto-512b17c3b17a4.jpg', 2926132, 'image/jpeg', 'a:3:{s:8:\"creation\";s:25:\"2013-02-25T07:50:27+00:00\";s:5:\"width\";i:2460;s:6:\"height\";i:1640;}');
INSERT INTO`tbl_entries_data_7` (`id`, `entry_id`, `file`, `size`, `mimetype`, `meta`) VALUES (2, 5, '/uploads/images/mountain_high_peak_sun-5133c4da4dc68.jpg', 545619, 'image/jpeg', 'a:3:{s:8:\"creation\";s:25:\"2013-03-03T21:47:06+00:00\";s:5:\"width\";i:1000;s:6:\"height\";i:606;}');

-- *** STRUCTURE:`tbl_entries_data_8` ***
DROP TABLE IF EXISTS`tbl_entries_data_8`;
CREATE TABLE`tbl_entries_data_8` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_8` ***
INSERT INTO`tbl_entries_data_8` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 3, '<h1>Header</h1>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<h1>Header</h1>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE:`tbl_entries_data_9` ***
DROP TABLE IF EXISTS`tbl_entries_data_9`;
CREATE TABLE`tbl_entries_data_9` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `relation_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `relation_id` (`relation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA:`tbl_entries_data_9` ***
INSERT INTO`tbl_entries_data_9` (`id`, `entry_id`, `relation_id`) VALUES (1, 3, 2);

-- *** DATA:`tbl_ckeditor_link_templates` ***

-- *** DATA:`tbl_entries` ***
INSERT INTO`tbl_entries` (`id`, `section_id`, `author_id`, `creation_date`, `creation_date_gmt`, `modification_date`, `modification_date_gmt`) VALUES (1, 1, 1, '2013-02-24 23:28:39', '2013-02-24 23:28:39', '2013-02-24 23:28:39', '2013-02-24 23:28:39');
INSERT INTO`tbl_entries` (`id`, `section_id`, `author_id`, `creation_date`, `creation_date_gmt`, `modification_date`, `modification_date_gmt`) VALUES (2, 2, 1, '2013-02-25 07:50:27', '2013-02-25 07:50:27', '2013-02-25 07:50:27', '2013-02-25 07:50:27');
INSERT INTO`tbl_entries` (`id`, `section_id`, `author_id`, `creation_date`, `creation_date_gmt`, `modification_date`, `modification_date_gmt`) VALUES (3, 3, 1, '2013-02-25 07:50:30', '2013-02-25 07:50:30', '2013-02-25 07:50:30', '2013-02-25 07:50:30');
INSERT INTO`tbl_entries` (`id`, `section_id`, `author_id`, `creation_date`, `creation_date_gmt`, `modification_date`, `modification_date_gmt`) VALUES (4, 4, 1, '2013-02-25 07:51:02', '2013-02-25 07:51:02', '2013-03-03 21:46:36', '2013-03-03 21:46:36');
INSERT INTO`tbl_entries` (`id`, `section_id`, `author_id`, `creation_date`, `creation_date_gmt`, `modification_date`, `modification_date_gmt`) VALUES (5, 2, 1, '2013-03-03 21:47:06', '2013-03-03 21:47:06', '2013-03-03 21:47:06', '2013-03-03 21:47:06');
INSERT INTO`tbl_entries` (`id`, `section_id`, `author_id`, `creation_date`, `creation_date_gmt`, `modification_date`, `modification_date_gmt`) VALUES (6, 4, 1, '2013-03-03 21:47:52', '2013-03-03 21:47:52', '2013-03-03 21:47:52', '2013-03-03 21:47:52');

-- *** DATA:`tbl_extensions` ***
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (1, 'ckeditor', 'enabled', '1.3.3');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (2, 'content_type_mappings', 'enabled', 1.5);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (3, 'datetime', 'enabled', '3.0.6');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (4, 'debugdevkit', 'enabled', '1.2.3');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (5, 'default_event_values', 'enabled', 0.6);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (6, 'dump_db', 'enabled', 1.10);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (7, 'duplicate_section', 'enabled', 1.2);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (8, 'entity_diagram', 'enabled', '1.5.1');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (9, 'export_ensemble', 'enabled', '2.0.2');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (10, 'form_select2', 'enabled', 1.0);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (11, 'importcsv', 'enabled', 0.3);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (12, 'jit_image_manipulation', 'enabled', 1.17);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (13, 'limit_section_entries', 'enabled', '1.1.0');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (14, 'maintenance_mode', 'enabled', 1.6);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (15, 'markdown', 'enabled', 1.15);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (16, 'numberfield', 'enabled', 1.6);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (17, 'order_entries', 'enabled', '1.10.1');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (18, 'pretty_photo', 'enabled', '1.0.1');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (19, 'profiledevkit', 'enabled', 1.2);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (20, 'publish_tabs', 'enabled', '1.1.2');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (21, 'publishfiltering', 'enabled', '1.7.0');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (22, 'referencelink', 'enabled', 1.4);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (23, 'resave_entries', 'enabled', 0.2);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (24, 'save_and_return', 'enabled', '1.6.1');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (25, 'selectbox_link_field', 'enabled', 1.26);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (26, 'sortdatasourcebyparam', 'enabled', 1.1);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (27, 'subsectionmanager', 'enabled', '3.0beta3');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (28, 'symql', 'enabled', '0.7.0');
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (29, 'uniqueuploadfield', 'enabled', 1.7);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (30, 'xmlimporter', 'enabled', 2.0);
INSERT INTO`tbl_extensions` (`id`, `name`, `status`, `version`) VALUES (31, 'xssfilter', 'enabled', '1.1.1');

-- *** DATA:`tbl_extensions_delegates` ***
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (1, 1, '/backend/', 'ModifyTextareaFieldPublishWidget', 'applyCKEditor');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (2, 1, '/backend/', 'ModifyTextBoxFullFieldPublishWidget', 'applyCKEditor');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (3, 1, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPresets');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (4, 1, '/system/preferences/', 'Save', 'savePresets');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (5, 2, '/frontend/', 'FrontendPreRenderHeaders', 'setContentType');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (6, 2, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'addCustomPreferenceFieldsets');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (7, 2, '/system/preferences/', 'Save', 'save');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (8, 2, '/backend/', 'AdminPagePreGenerate', '__appendAssets');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (9, 3, '/system/preferences/', 'AddCustomPreferenceFieldsets', '__addPreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (10, 3, '/system/preferences/', 'Save', '__savePreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (11, 4, '/frontend/', 'FrontendDevKitResolve', 'frontendDevKitResolve');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (12, 4, '/frontend/', 'ManipulateDevKitNavigation', 'manipulateDevKitNavigation');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (13, 5, '/backend/', 'AdminPagePreGenerate', 'AdminPagePreGenerate');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (14, 5, '/blueprints/events/', 'EventPreCreate', 'saveEssentials');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (15, 5, '/blueprints/events/', 'EventPreEdit', 'saveEssentials');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (16, 5, '/frontend/', 'EventPreSaveFilter', 'setDefaultValues');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (17, 6, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (18, 6, '/backend/', 'InitaliseAdminPageHead', 'initaliseAdminPageHead');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (19, 6, '/backend/', 'AppendPageAlert', 'appendAlert');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (20, 7, '/backend/', 'AdminPagePreGenerate', '__action');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (21, 8, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (22, 9, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (23, 10, '/backend/', 'InitaliseAdminPageHead', 'initaliseAdminPageHead');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (24, 12, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (25, 12, '/system/preferences/', 'Save', '__SavePreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (26, 13, '/backend/', 'InitaliseAdminPageHead', 'dInitaliseAdminPageHead');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (27, 13, '/backend/', 'AppendPageAlert', 'dAppendPageAlert');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (28, 13, '/backend/', 'AdminPagePreGenerate', 'dAdminPagePreGenerate');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (29, 13, '/blueprints/sections/', 'AddSectionElements', 'dAddSectionElements');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (30, 13, '/blueprints/sections/', 'SectionPreCreate', 'dSaveSectionSettings');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (31, 13, '/blueprints/sections/', 'SectionPreEdit', 'dSaveSectionSettings');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (32, 14, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (33, 14, '/system/preferences/', 'Save', '__SavePreferences');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (34, 14, '/system/preferences/', 'CustomActions', '__toggleMaintenanceMode');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (35, 14, '/backend/', 'AppendPageAlert', '__appendAlert');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (36, 14, '/blueprints/pages/', 'AppendPageContent', '__appendType');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (37, 14, '/frontend/', 'FrontendPrePageResolve', '__checkForMaintenanceMode');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (38, 14, '/frontend/', 'FrontendParamsResolve', '__addParam');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (39, 17, '/backend/', 'InitaliseAdminPageHead', 'appendScriptToHead');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (40, 18, '/backend/', 'InitaliseAdminPageHead', 'dInitaliseAdminPageHead');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (41, 19, '/frontend/', 'FrontendDevKitResolve', 'frontendDevKitResolve');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (42, 19, '/frontend/', 'ManipulateDevKitNavigation', 'manipulateDevKitNavigation');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (43, 20, '/backend/', 'InitaliseAdminPageHead', 'initializeAdmin');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (44, 21, '/backend/', 'InitaliseAdminPageHead', 'initaliseAdminPageHead');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (45, 21, '/blueprints/sections/', 'AddSectionElements', 'addSectionSetting');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (46, 21, '/blueprints/sections/', 'SectionPreCreate', 'saveSectionSettings');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (47, 21, '/blueprints/sections/', 'SectionPreEdit', 'saveSectionSettings');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (48, 22, '/backend/', 'InitaliseAdminPageHead', 'initializeAdmin');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (49, 23, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'AddCustomPreferenceFieldsets');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (50, 23, '/backend/', 'InitaliseAdminPageHead', 'InitaliseAdminPageHead');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (51, 24, '/backend/', 'InitaliseAdminPageHead', 'appendJS');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (52, 24, '/backend/', 'AdminPagePreGenerate', 'appendElement');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (53, 24, '/publish/edit/', 'EntryPostEdit', 'entryPostEdit');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (54, 24, '/publish/new/', 'EntryPostCreate', 'entryPostEdit');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (55, 26, '/backend/', 'InitaliseAdminPageHead', 'addJavaScriptAndCSS');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (56, 27, '/backend/', 'AdminPagePreGenerate', '__appendAssets');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (57, 27, '/blueprints/datasources/', 'DatasourcePostCreate', '__clearSubsectionCache');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (58, 27, '/blueprints/datasources/', 'DatasourcePostEdit', '__clearSubsectionCache');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (59, 27, '/blueprints/datasources/', 'DatasourcePreDelete', '__clearSubsectionCache');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (60, 27, '/frontend/', 'DataSourceEntriesBuilt', '__prepareSubsection');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (61, 27, '/publish/', 'Delete', '__deleteTabs');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (62, 31, '/blueprints/events/new/', 'AppendEventFilter', 'appendEventFilter');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (63, 31, '/blueprints/events/edit/', 'AppendEventFilter', 'appendEventFilter');
INSERT INTO`tbl_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (64, 31, '/frontend/', 'EventPreSaveFilter', 'eventPreSaveFilter');

-- *** DATA:`tbl_fields` ***
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (10, 'Overview View', 'overview-view', 'publish_tabs', 4, 'no', 0, 'main', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (2, 'Header', 'header', 'textarea', 1, 'no', 1, 'main', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (3, 'Column 1', 'column-1', 'textarea', 1, 'no', 2, 'sidebar', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (4, 'Column 2', 'column-2', 'textarea', 1, 'no', 3, 'sidebar', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (5, 'Column 3', 'column-3', 'textarea', 1, 'no', 4, 'sidebar', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (6, 'Title', 'title', 'input', 2, 'yes', 0, 'main', 'yes');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (7, 'Image', 'image', 'uniqueupload', 2, 'yes', 1, 'sidebar', 'yes');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (8, 'Content', 'content', 'textarea', 3, 'no', 0, 'main', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (9, 'Image', 'image', 'subsectionmanager', 3, 'no', 1, 'sidebar', 'yes');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (11, 'Title', 'title', 'input', 4, 'no', 1, 'main', 'yes');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (12, 'Overview ', 'overview', 'textarea', 4, 'no', 2, 'main', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (13, 'Order', 'order', 'order_entries', 4, 'no', 4, 'sidebar', 'yes');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (14, 'Image', 'image', 'subsectionmanager', 4, 'no', 3, 'sidebar', 'yes');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (15, 'Detail View', 'detail-view', 'publish_tabs', 4, 'no', 6, 'main', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (16, 'Description', 'description', 'textarea', 4, 'no', 7, 'main', 'no');
INSERT INTO`tbl_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (17, 'Published', 'published', 'checkbox', 4, 'no', 5, 'sidebar', 'yes');

-- *** DATA:`tbl_pages` ***
INSERT INTO`tbl_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (1, NULL, 'JSON', 'json', NULL, NULL, NULL, NULL, 1);
INSERT INTO`tbl_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (2, 1, 'Home', 'home', 'json', NULL, NULL, NULL, 2);
INSERT INTO`tbl_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (3, 2, 'About', 'about', 'json/home', NULL, 'home_about', NULL, 3);
INSERT INTO`tbl_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (4, 2, 'Groups', 'groups', 'json/home', NULL, 'home_groups', NULL, 4);
INSERT INTO`tbl_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (5, 2, 'Deals', 'deals', 'json/home', NULL, 'deals_all', NULL, 5);

-- *** DATA:`tbl_pages_types` ***
INSERT INTO`tbl_pages_types` (`id`, `page_id`, `type`) VALUES (8, 4, 'JSON');
INSERT INTO`tbl_pages_types` (`id`, `page_id`, `type`) VALUES (6, 5, 'JSON');
INSERT INTO`tbl_pages_types` (`id`, `page_id`, `type`) VALUES (7, 3, 'JSON');
INSERT INTO`tbl_pages_types` (`id`, `page_id`, `type`) VALUES (4, 2, 'JSON');
INSERT INTO`tbl_pages_types` (`id`, `page_id`, `type`) VALUES (5, 1, 'JSON');

-- *** DATA:`tbl_sections` ***
INSERT INTO`tbl_sections` (`id`, `name`, `handle`, `sortorder`, `hidden`, `max_entries`, `navigation_group`) VALUES (1, 'About', 'about', 1, 'no', 1, 'Home');
INSERT INTO`tbl_sections` (`id`, `name`, `handle`, `sortorder`, `hidden`, `max_entries`, `navigation_group`) VALUES (2, 'Images', 'images', 2, 'no', 0, 'Site');
INSERT INTO`tbl_sections` (`id`, `name`, `handle`, `sortorder`, `hidden`, `max_entries`, `navigation_group`) VALUES (3, 'Groups', 'groups', 3, 'no', 1, 'Home');
INSERT INTO`tbl_sections` (`id`, `name`, `handle`, `sortorder`, `hidden`, `max_entries`, `navigation_group`) VALUES (4, 'Deals', 'deals', 4, 'no', 0, 'Home');

-- *** DATA:`tbl_sections_association` ***
INSERT INTO`tbl_sections_association` (`id`, `parent_section_id`, `parent_section_field_id`, `child_section_id`, `child_section_field_id`, `hide_association`) VALUES (5, 3, 9, 2, 9, 'yes');
INSERT INTO`tbl_sections_association` (`id`, `parent_section_id`, `parent_section_field_id`, `child_section_id`, `child_section_field_id`, `hide_association`) VALUES (6, 4, 14, 2, 14, 'yes');
