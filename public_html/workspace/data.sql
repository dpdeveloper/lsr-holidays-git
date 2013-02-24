
-- *** STRUCTURE: `sym_cache` ***
DROP TABLE IF EXISTS `sym_cache`;
CREATE TABLE `sym_cache` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `hash` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `creation` int(14) NOT NULL DEFAULT '0',
  `expiry` int(14) unsigned DEFAULT NULL,
  `data` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `expiry` (`expiry`),
  KEY `hash` (`hash`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** STRUCTURE: `sym_ckeditor_link_templates` ***
DROP TABLE IF EXISTS `sym_ckeditor_link_templates`;
CREATE TABLE `sym_ckeditor_link_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(255) NOT NULL,
  `field_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- *** DATA: `sym_ckeditor_link_templates` ***

-- *** STRUCTURE: `sym_entries` ***
DROP TABLE IF EXISTS `sym_entries`;
CREATE TABLE `sym_entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `section_id` int(11) unsigned NOT NULL,
  `author_id` int(11) unsigned NOT NULL,
  `creation_date` datetime NOT NULL,
  `creation_date_gmt` datetime NOT NULL,
  `modification_date` datetime NOT NULL,
  `modification_date_gmt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `section_id` (`section_id`),
  KEY `author_id` (`author_id`),
  KEY `creation_date` (`creation_date`),
  KEY `creation_date_gmt` (`creation_date_gmt`),
  KEY `modification_date` (`modification_date`),
  KEY `modification_date_gmt` (`modification_date_gmt`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries` ***
INSERT INTO `sym_entries` (`id`, `section_id`, `author_id`, `creation_date`, `creation_date_gmt`, `modification_date`, `modification_date_gmt`) VALUES (1, 1, 1, '2013-02-24 23:28:39', '2013-02-24 23:28:39', '2013-02-24 23:28:39', '2013-02-24 23:28:39');

-- *** STRUCTURE: `sym_entries_data_10` ***
DROP TABLE IF EXISTS `sym_entries_data_10`;
CREATE TABLE `sym_entries_data_10` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- *** DATA: `sym_entries_data_10` ***

-- *** STRUCTURE: `sym_entries_data_11` ***
DROP TABLE IF EXISTS `sym_entries_data_11`;
CREATE TABLE `sym_entries_data_11` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `handle` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  KEY `handle` (`handle`),
  KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_11` ***

-- *** STRUCTURE: `sym_entries_data_12` ***
DROP TABLE IF EXISTS `sym_entries_data_12`;
CREATE TABLE `sym_entries_data_12` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_12` ***

-- *** STRUCTURE: `sym_entries_data_13` ***
DROP TABLE IF EXISTS `sym_entries_data_13`;
CREATE TABLE `sym_entries_data_13` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- *** DATA: `sym_entries_data_13` ***

-- *** STRUCTURE: `sym_entries_data_14` ***
DROP TABLE IF EXISTS `sym_entries_data_14`;
CREATE TABLE `sym_entries_data_14` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `relation_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `relation_id` (`relation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_14` ***

-- *** STRUCTURE: `sym_entries_data_15` ***
DROP TABLE IF EXISTS `sym_entries_data_15`;
CREATE TABLE `sym_entries_data_15` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- *** DATA: `sym_entries_data_15` ***

-- *** STRUCTURE: `sym_entries_data_16` ***
DROP TABLE IF EXISTS `sym_entries_data_16`;
CREATE TABLE `sym_entries_data_16` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_16` ***

-- *** STRUCTURE: `sym_entries_data_17` ***
DROP TABLE IF EXISTS `sym_entries_data_17`;
CREATE TABLE `sym_entries_data_17` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_17` ***

-- *** STRUCTURE: `sym_entries_data_2` ***
DROP TABLE IF EXISTS `sym_entries_data_2`;
CREATE TABLE `sym_entries_data_2` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_2` ***
INSERT INTO `sym_entries_data_2` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE: `sym_entries_data_3` ***
DROP TABLE IF EXISTS `sym_entries_data_3`;
CREATE TABLE `sym_entries_data_3` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_3` ***
INSERT INTO `sym_entries_data_3` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE: `sym_entries_data_4` ***
DROP TABLE IF EXISTS `sym_entries_data_4`;
CREATE TABLE `sym_entries_data_4` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_4` ***
INSERT INTO `sym_entries_data_4` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE: `sym_entries_data_5` ***
DROP TABLE IF EXISTS `sym_entries_data_5`;
CREATE TABLE `sym_entries_data_5` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_5` ***
INSERT INTO `sym_entries_data_5` (`id`, `entry_id`, `value`, `value_formatted`) VALUES (1, 1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.</p>\r\n');

-- *** STRUCTURE: `sym_entries_data_6` ***
DROP TABLE IF EXISTS `sym_entries_data_6`;
CREATE TABLE `sym_entries_data_6` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `handle` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  KEY `handle` (`handle`),
  KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_6` ***

-- *** STRUCTURE: `sym_entries_data_7` ***
DROP TABLE IF EXISTS `sym_entries_data_7`;
CREATE TABLE `sym_entries_data_7` (
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_7` ***

-- *** STRUCTURE: `sym_entries_data_8` ***
DROP TABLE IF EXISTS `sym_entries_data_8`;
CREATE TABLE `sym_entries_data_8` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci,
  `value_formatted` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entry_id` (`entry_id`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_8` ***

-- *** STRUCTURE: `sym_entries_data_9` ***
DROP TABLE IF EXISTS `sym_entries_data_9`;
CREATE TABLE `sym_entries_data_9` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `relation_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `relation_id` (`relation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_entries_data_9` ***

-- *** STRUCTURE: `sym_extensions` ***
DROP TABLE IF EXISTS `sym_extensions`;
CREATE TABLE `sym_extensions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `status` enum('enabled','disabled') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'enabled',
  `version` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_extensions` ***
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (1, 'ckeditor', 'enabled', '1.3.3');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (2, 'content_type_mappings', 'enabled', 1.5);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (3, 'datetime', 'enabled', '3.0.6');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (4, 'debugdevkit', 'enabled', '1.2.3');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (5, 'default_event_values', 'enabled', 0.6);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (6, 'dump_db', 'enabled', 1.10);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (7, 'duplicate_section', 'enabled', 1.2);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (8, 'entity_diagram', 'enabled', '1.5.1');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (9, 'export_ensemble', 'enabled', '2.0.2');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (10, 'form_select2', 'enabled', 1.0);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (11, 'importcsv', 'enabled', 0.3);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (12, 'jit_image_manipulation', 'enabled', 1.17);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (13, 'limit_section_entries', 'enabled', '1.1.0');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (14, 'maintenance_mode', 'enabled', 1.6);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (15, 'markdown', 'enabled', 1.15);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (16, 'numberfield', 'enabled', 1.6);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (17, 'order_entries', 'enabled', '1.10.1');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (18, 'pretty_photo', 'enabled', '1.0.1');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (19, 'profiledevkit', 'enabled', 1.2);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (20, 'publish_tabs', 'enabled', '1.1.2');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (21, 'publishfiltering', 'enabled', '1.7.0');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (22, 'referencelink', 'enabled', 1.4);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (23, 'resave_entries', 'enabled', 0.2);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (24, 'save_and_return', 'enabled', '1.6.1');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (25, 'selectbox_link_field', 'enabled', 1.26);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (26, 'sortdatasourcebyparam', 'enabled', 1.1);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (27, 'subsectionmanager', 'enabled', '3.0beta3');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (28, 'symql', 'enabled', '0.7.0');
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (29, 'uniqueuploadfield', 'enabled', 1.7);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (30, 'xmlimporter', 'enabled', 2.0);
INSERT INTO `sym_extensions` (`id`, `name`, `status`, `version`) VALUES (31, 'xssfilter', 'enabled', '1.1.1');

-- *** STRUCTURE: `sym_extensions_delegates` ***
DROP TABLE IF EXISTS `sym_extensions_delegates`;
CREATE TABLE `sym_extensions_delegates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `extension_id` int(11) NOT NULL,
  `page` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `delegate` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `callback` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `extension_id` (`extension_id`),
  KEY `page` (`page`),
  KEY `delegate` (`delegate`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_extensions_delegates` ***
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (1, 1, '/backend/', 'ModifyTextareaFieldPublishWidget', 'applyCKEditor');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (2, 1, '/backend/', 'ModifyTextBoxFullFieldPublishWidget', 'applyCKEditor');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (3, 1, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPresets');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (4, 1, '/system/preferences/', 'Save', 'savePresets');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (5, 2, '/frontend/', 'FrontendPreRenderHeaders', 'setContentType');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (6, 2, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'addCustomPreferenceFieldsets');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (7, 2, '/system/preferences/', 'Save', 'save');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (8, 2, '/backend/', 'AdminPagePreGenerate', '__appendAssets');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (9, 3, '/system/preferences/', 'AddCustomPreferenceFieldsets', '__addPreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (10, 3, '/system/preferences/', 'Save', '__savePreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (11, 4, '/frontend/', 'FrontendDevKitResolve', 'frontendDevKitResolve');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (12, 4, '/frontend/', 'ManipulateDevKitNavigation', 'manipulateDevKitNavigation');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (13, 5, '/backend/', 'AdminPagePreGenerate', 'AdminPagePreGenerate');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (14, 5, '/blueprints/events/', 'EventPreCreate', 'saveEssentials');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (15, 5, '/blueprints/events/', 'EventPreEdit', 'saveEssentials');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (16, 5, '/frontend/', 'EventPreSaveFilter', 'setDefaultValues');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (17, 6, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (18, 6, '/backend/', 'InitaliseAdminPageHead', 'initaliseAdminPageHead');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (19, 6, '/backend/', 'AppendPageAlert', 'appendAlert');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (20, 7, '/backend/', 'AdminPagePreGenerate', '__action');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (21, 8, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (22, 9, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (23, 10, '/backend/', 'InitaliseAdminPageHead', 'initaliseAdminPageHead');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (24, 12, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (25, 12, '/system/preferences/', 'Save', '__SavePreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (26, 13, '/backend/', 'InitaliseAdminPageHead', 'dInitaliseAdminPageHead');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (27, 13, '/backend/', 'AppendPageAlert', 'dAppendPageAlert');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (28, 13, '/backend/', 'AdminPagePreGenerate', 'dAdminPagePreGenerate');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (29, 13, '/blueprints/sections/', 'AddSectionElements', 'dAddSectionElements');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (30, 13, '/blueprints/sections/', 'SectionPreCreate', 'dSaveSectionSettings');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (31, 13, '/blueprints/sections/', 'SectionPreEdit', 'dSaveSectionSettings');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (32, 14, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'appendPreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (33, 14, '/system/preferences/', 'Save', '__SavePreferences');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (34, 14, '/system/preferences/', 'CustomActions', '__toggleMaintenanceMode');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (35, 14, '/backend/', 'AppendPageAlert', '__appendAlert');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (36, 14, '/blueprints/pages/', 'AppendPageContent', '__appendType');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (37, 14, '/frontend/', 'FrontendPrePageResolve', '__checkForMaintenanceMode');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (38, 14, '/frontend/', 'FrontendParamsResolve', '__addParam');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (39, 17, '/backend/', 'InitaliseAdminPageHead', 'appendScriptToHead');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (40, 18, '/backend/', 'InitaliseAdminPageHead', 'dInitaliseAdminPageHead');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (41, 19, '/frontend/', 'FrontendDevKitResolve', 'frontendDevKitResolve');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (42, 19, '/frontend/', 'ManipulateDevKitNavigation', 'manipulateDevKitNavigation');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (43, 20, '/backend/', 'InitaliseAdminPageHead', 'initializeAdmin');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (44, 21, '/backend/', 'InitaliseAdminPageHead', 'initaliseAdminPageHead');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (45, 21, '/blueprints/sections/', 'AddSectionElements', 'addSectionSetting');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (46, 21, '/blueprints/sections/', 'SectionPreCreate', 'saveSectionSettings');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (47, 21, '/blueprints/sections/', 'SectionPreEdit', 'saveSectionSettings');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (48, 22, '/backend/', 'InitaliseAdminPageHead', 'initializeAdmin');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (49, 23, '/system/preferences/', 'AddCustomPreferenceFieldsets', 'AddCustomPreferenceFieldsets');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (50, 23, '/backend/', 'InitaliseAdminPageHead', 'InitaliseAdminPageHead');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (51, 24, '/backend/', 'InitaliseAdminPageHead', 'appendJS');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (52, 24, '/backend/', 'AdminPagePreGenerate', 'appendElement');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (53, 24, '/publish/edit/', 'EntryPostEdit', 'entryPostEdit');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (54, 24, '/publish/new/', 'EntryPostCreate', 'entryPostEdit');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (55, 26, '/backend/', 'InitaliseAdminPageHead', 'addJavaScriptAndCSS');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (56, 27, '/backend/', 'AdminPagePreGenerate', '__appendAssets');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (57, 27, '/blueprints/datasources/', 'DatasourcePostCreate', '__clearSubsectionCache');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (58, 27, '/blueprints/datasources/', 'DatasourcePostEdit', '__clearSubsectionCache');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (59, 27, '/blueprints/datasources/', 'DatasourcePreDelete', '__clearSubsectionCache');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (60, 27, '/frontend/', 'DataSourceEntriesBuilt', '__prepareSubsection');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (61, 27, '/publish/', 'Delete', '__deleteTabs');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (62, 31, '/blueprints/events/new/', 'AppendEventFilter', 'appendEventFilter');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (63, 31, '/blueprints/events/edit/', 'AppendEventFilter', 'appendEventFilter');
INSERT INTO `sym_extensions_delegates` (`id`, `extension_id`, `page`, `delegate`, `callback`) VALUES (64, 31, '/frontend/', 'EventPreSaveFilter', 'eventPreSaveFilter');

-- *** STRUCTURE: `sym_fields` ***
DROP TABLE IF EXISTS `sym_fields`;
CREATE TABLE `sym_fields` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `element_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `parent_section` int(11) NOT NULL DEFAULT '0',
  `required` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  `sortorder` int(11) NOT NULL DEFAULT '1',
  `location` enum('main','sidebar') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'main',
  `show_column` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`),
  KEY `index` (`element_name`,`type`,`parent_section`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields` ***
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (10, 'Overview View', 'overview-view', 'publish_tabs', 4, 'no', 0, 'main', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (2, 'Header', 'header', 'textarea', 1, 'no', 1, 'main', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (3, 'Column 1', 'column-1', 'textarea', 1, 'no', 2, 'sidebar', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (4, 'Column 2', 'column-2', 'textarea', 1, 'no', 3, 'sidebar', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (5, 'Column 3', 'column-3', 'textarea', 1, 'no', 4, 'sidebar', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (6, 'Title', 'title', 'input', 2, 'yes', 0, 'main', 'yes');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (7, 'Image', 'image', 'uniqueupload', 2, 'yes', 1, 'sidebar', 'yes');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (8, 'Content', 'content', 'textarea', 3, 'no', 0, 'main', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (9, 'Image', 'image', 'subsectionmanager', 3, 'no', 1, 'main', 'yes');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (11, 'Title', 'title', 'input', 4, 'no', 1, 'main', 'yes');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (12, 'Overview ', 'overview', 'textarea', 4, 'no', 2, 'main', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (13, 'Order', 'order', 'order_entries', 4, 'no', 4, 'sidebar', 'yes');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (14, 'Image', 'image', 'subsectionmanager', 4, 'no', 5, 'sidebar', 'yes');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (15, 'Detail View', 'detail-view', 'publish_tabs', 4, 'no', 6, 'main', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (16, 'Description', 'description', 'textarea', 4, 'no', 7, 'main', 'no');
INSERT INTO `sym_fields` (`id`, `label`, `element_name`, `type`, `parent_section`, `required`, `sortorder`, `location`, `show_column`) VALUES (17, 'Published', 'published', 'checkbox', 4, 'no', 3, 'sidebar', 'yes');

-- *** STRUCTURE: `sym_fields_author` ***
DROP TABLE IF EXISTS `sym_fields_author`;
CREATE TABLE `sym_fields_author` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `allow_multiple_selection` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `default_to_current_user` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL,
  `author_types` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_author` ***

-- *** STRUCTURE: `sym_fields_checkbox` ***
DROP TABLE IF EXISTS `sym_fields_checkbox`;
CREATE TABLE `sym_fields_checkbox` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `default_state` enum('on','off') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'on',
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_checkbox` ***
INSERT INTO `sym_fields_checkbox` (`id`, `field_id`, `default_state`, `description`) VALUES (1, 17, 'on', NULL);

-- *** STRUCTURE: `sym_fields_date` ***
DROP TABLE IF EXISTS `sym_fields_date`;
CREATE TABLE `sym_fields_date` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `pre_populate` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_date` ***

-- *** STRUCTURE: `sym_fields_datetime` ***
DROP TABLE IF EXISTS `sym_fields_datetime`;
CREATE TABLE `sym_fields_datetime` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `prepopulate` tinyint(1) DEFAULT '1',
  `time` tinyint(1) DEFAULT '1',
  `multiple` tinyint(1) DEFAULT '1',
  `range` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_datetime` ***

-- *** STRUCTURE: `sym_fields_input` ***
DROP TABLE IF EXISTS `sym_fields_input`;
CREATE TABLE `sym_fields_input` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `validator` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_input` ***
INSERT INTO `sym_fields_input` (`id`, `field_id`, `validator`) VALUES (1, 6, NULL);
INSERT INTO `sym_fields_input` (`id`, `field_id`, `validator`) VALUES (3, 11, NULL);

-- *** STRUCTURE: `sym_fields_number` ***
DROP TABLE IF EXISTS `sym_fields_number`;
CREATE TABLE `sym_fields_number` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_number` ***

-- *** STRUCTURE: `sym_fields_order_entries` ***
DROP TABLE IF EXISTS `sym_fields_order_entries`;
CREATE TABLE `sym_fields_order_entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `force_sort` enum('yes','no') DEFAULT 'no',
  `hide` enum('yes','no') DEFAULT 'no',
  PRIMARY KEY (`id`),
  UNIQUE KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- *** DATA: `sym_fields_order_entries` ***
INSERT INTO `sym_fields_order_entries` (`id`, `field_id`, `force_sort`, `hide`) VALUES (2, 13, 'yes', 'no');

-- *** STRUCTURE: `sym_fields_publish_tabs` ***
DROP TABLE IF EXISTS `sym_fields_publish_tabs`;
CREATE TABLE `sym_fields_publish_tabs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- *** DATA: `sym_fields_publish_tabs` ***
INSERT INTO `sym_fields_publish_tabs` (`id`, `field_id`) VALUES (6, 10);
INSERT INTO `sym_fields_publish_tabs` (`id`, `field_id`) VALUES (7, 15);

-- *** STRUCTURE: `sym_fields_referencelink` ***
DROP TABLE IF EXISTS `sym_fields_referencelink`;
CREATE TABLE `sym_fields_referencelink` (
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

-- *** DATA: `sym_fields_referencelink` ***

-- *** STRUCTURE: `sym_fields_select` ***
DROP TABLE IF EXISTS `sym_fields_select`;
CREATE TABLE `sym_fields_select` (
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

-- *** DATA: `sym_fields_select` ***

-- *** STRUCTURE: `sym_fields_selectbox_link` ***
DROP TABLE IF EXISTS `sym_fields_selectbox_link`;
CREATE TABLE `sym_fields_selectbox_link` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `allow_multiple_selection` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `show_association` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'yes',
  `related_field_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `limit` int(4) unsigned NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_selectbox_link` ***

-- *** STRUCTURE: `sym_fields_subsectionmanager` ***
DROP TABLE IF EXISTS `sym_fields_subsectionmanager`;
CREATE TABLE `sym_fields_subsectionmanager` (
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_subsectionmanager` ***
INSERT INTO `sym_fields_subsectionmanager` (`id`, `field_id`, `subsection_id`, `filter_tags`, `caption`, `droptext`, `create`, `remove`, `allow_multiple`, `edit`, `sort`, `drop`, `show_search`, `show_preview`, `recursion_levels`) VALUES (2, 9, 2, NULL, '{$title}<br /> <em>{$image}</em>', NULL, 1, 1, 0, 1, 1, 0, 1, 1, 1);
INSERT INTO `sym_fields_subsectionmanager` (`id`, `field_id`, `subsection_id`, `filter_tags`, `caption`, `droptext`, `create`, `remove`, `allow_multiple`, `edit`, `sort`, `drop`, `show_search`, `show_preview`, `recursion_levels`) VALUES (4, 14, 2, NULL, '{$title}<br /> <em>{$image}</em>', NULL, 1, 1, 0, 1, 1, 0, 1, 1, 1);

-- *** STRUCTURE: `sym_fields_subsectiontabs` ***
DROP TABLE IF EXISTS `sym_fields_subsectiontabs`;
CREATE TABLE `sym_fields_subsectiontabs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `subsection_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `static_tabs` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_subsectiontabs` ***

-- *** STRUCTURE: `sym_fields_taglist` ***
DROP TABLE IF EXISTS `sym_fields_taglist`;
CREATE TABLE `sym_fields_taglist` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `validator` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pre_populate_source` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`),
  KEY `pre_populate_source` (`pre_populate_source`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_taglist` ***

-- *** STRUCTURE: `sym_fields_textarea` ***
DROP TABLE IF EXISTS `sym_fields_textarea`;
CREATE TABLE `sym_fields_textarea` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `formatter` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` int(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_textarea` ***
INSERT INTO `sym_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (15, 2, 'ckeditor', 8);
INSERT INTO `sym_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (16, 3, 'ckeditor', 8);
INSERT INTO `sym_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (17, 4, 'ckeditor', 8);
INSERT INTO `sym_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (18, 5, 'ckeditor', 8);
INSERT INTO `sym_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (19, 8, 'ckeditor', 15);
INSERT INTO `sym_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (22, 12, 'ckeditor', 10);
INSERT INTO `sym_fields_textarea` (`id`, `field_id`, `formatter`, `size`) VALUES (23, 16, 'ckeditor', 25);

-- *** STRUCTURE: `sym_fields_uniqueupload` ***
DROP TABLE IF EXISTS `sym_fields_uniqueupload`;
CREATE TABLE `sym_fields_uniqueupload` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `destination` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `validator` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_uniqueupload` ***
INSERT INTO `sym_fields_uniqueupload` (`id`, `field_id`, `destination`, `validator`) VALUES (1, 7, '/workspace/uploads/images', '/\\.(?:bmp|gif|jpe?g|png)$/i');

-- *** STRUCTURE: `sym_fields_upload` ***
DROP TABLE IF EXISTS `sym_fields_upload`;
CREATE TABLE `sym_fields_upload` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(11) unsigned NOT NULL,
  `destination` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `validator` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_fields_upload` ***

-- *** STRUCTURE: `sym_pages` ***
DROP TABLE IF EXISTS `sym_pages`;
CREATE TABLE `sym_pages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `handle` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `params` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_sources` text COLLATE utf8_unicode_ci,
  `events` text COLLATE utf8_unicode_ci,
  `sortorder` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `parent` (`parent`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_pages` ***
INSERT INTO `sym_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (1, NULL, 'JSON', 'json', NULL, NULL, NULL, NULL, 1);
INSERT INTO `sym_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (2, 1, 'Home', 'home', 'json', NULL, NULL, NULL, 2);
INSERT INTO `sym_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (3, 2, 'About', 'about', 'json/home', NULL, 'home_about', NULL, 3);
INSERT INTO `sym_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (4, 2, 'Groups', 'groups', 'json/home', NULL, 'home_groups', NULL, 4);
INSERT INTO `sym_pages` (`id`, `parent`, `title`, `handle`, `path`, `params`, `data_sources`, `events`, `sortorder`) VALUES (5, 2, 'Deals', 'deals', 'json/home', NULL, 'deals_all', NULL, 5);

-- *** STRUCTURE: `sym_pages_types` ***
DROP TABLE IF EXISTS `sym_pages_types`;
CREATE TABLE `sym_pages_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `page_id` int(11) unsigned NOT NULL,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `page_id` (`page_id`,`type`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_pages_types` ***
INSERT INTO `sym_pages_types` (`id`, `page_id`, `type`) VALUES (8, 4, 'JSON');
INSERT INTO `sym_pages_types` (`id`, `page_id`, `type`) VALUES (6, 5, 'JSON');
INSERT INTO `sym_pages_types` (`id`, `page_id`, `type`) VALUES (7, 3, 'JSON');
INSERT INTO `sym_pages_types` (`id`, `page_id`, `type`) VALUES (4, 2, 'JSON');
INSERT INTO `sym_pages_types` (`id`, `page_id`, `type`) VALUES (5, 1, 'JSON');

-- *** STRUCTURE: `sym_sections` ***
DROP TABLE IF EXISTS `sym_sections`;
CREATE TABLE `sym_sections` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `handle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sortorder` int(11) NOT NULL DEFAULT '0',
  `hidden` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  `max_entries` int(11) NOT NULL DEFAULT '0',
  `navigation_group` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Content',
  PRIMARY KEY (`id`),
  UNIQUE KEY `handle` (`handle`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_sections` ***
INSERT INTO `sym_sections` (`id`, `name`, `handle`, `sortorder`, `hidden`, `max_entries`, `navigation_group`) VALUES (1, 'About', 'about', 1, 'no', 1, 'Home');
INSERT INTO `sym_sections` (`id`, `name`, `handle`, `sortorder`, `hidden`, `max_entries`, `navigation_group`) VALUES (2, 'Images', 'images', 2, 'no', 0, 'Site');
INSERT INTO `sym_sections` (`id`, `name`, `handle`, `sortorder`, `hidden`, `max_entries`, `navigation_group`) VALUES (3, 'Groups', 'groups', 3, 'no', 1, 'Home');
INSERT INTO `sym_sections` (`id`, `name`, `handle`, `sortorder`, `hidden`, `max_entries`, `navigation_group`) VALUES (4, 'Deals', 'deals', 4, 'no', 0, 'Home');

-- *** STRUCTURE: `sym_sections_association` ***
DROP TABLE IF EXISTS `sym_sections_association`;
CREATE TABLE `sym_sections_association` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent_section_id` int(11) unsigned NOT NULL,
  `parent_section_field_id` int(11) unsigned DEFAULT NULL,
  `child_section_id` int(11) unsigned NOT NULL,
  `child_section_field_id` int(11) unsigned NOT NULL,
  `hide_association` enum('yes','no') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`),
  KEY `parent_section_id` (`parent_section_id`,`child_section_id`,`child_section_field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- *** DATA: `sym_sections_association` ***
INSERT INTO `sym_sections_association` (`id`, `parent_section_id`, `parent_section_field_id`, `child_section_id`, `child_section_field_id`, `hide_association`) VALUES (2, 3, 9, 2, 9, 'yes');
INSERT INTO `sym_sections_association` (`id`, `parent_section_id`, `parent_section_field_id`, `child_section_id`, `child_section_field_id`, `hide_association`) VALUES (4, 4, 14, 2, 14, 'yes');
