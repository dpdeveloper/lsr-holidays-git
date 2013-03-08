<?php
	$settings = array(


		###### ADMIN ######
		'admin' => array(
			'max_upload_size' => '5242880',
		),
		########


		###### SYMPHONY ######
		'symphony' => array(
			'pagination_maximum_rows' => '20',
			'lang' => 'en',
			'pages_table_nest_children' => 'no',
			'version' => '2.3.1',
			'cookie_prefix' => 'sym-',
			'session_gc_divisor' => '10',
		),
		########


		###### LOG ######
		'log' => array(
			'archive' => '1',
			'maxsize' => '102400',
		),
		########


		###### DATABASE ######
		'database' => array(
			'host' => 'localhost',
			'port' => '3306',
			'user' => null,
			'password' => null,
			'db' => null,
			'tbl_prefix' => 'sym_',
		),
		########


		###### PUBLIC ######
		'public' => array(
			'display_event_xml_in_source' => 'no',
		),
		########


		###### GENERAL ######
		'general' => array(
			'sitename' => 'LSR Holidays: Content',
		),
		########


		###### FILE ######
		'file' => array(
			'write_mode' => '0644',
		),
		########


		###### DIRECTORY ######
		'directory' => array(
			'write_mode' => '0755',
		),
		########


		###### REGION ######
		'region' => array(
			'time_format' => 'H:i',
			'date_format' => 'd.m.y',
			'datetime_separator' => ' ',
			'timezone' => 'Europe/London',
		),
		########


		###### IMAGE ######
		'image' => array(
			'cache' => '1',
			'quality' => '90',
		),
		########


		###### CONTENT-TYPE-MAPPINGS ######
		'content-type-mappings' => array(
			'xml' => 'text/xml; charset=utf-8',
			'text' => 'text/plain; charset=utf-8',
			'css' => 'text/css; charset=utf-8',
			'json' => 'application/json; charset=utf-8',
		),
		########


		###### DATETIME ######
		'datetime' => array(
			'english' => 'en, en_GB.UTF8, en_GB',
		),
		########


		###### MAINTENANCE_MODE ######
		'maintenance_mode' => array(
			'enabled' => 'no',
		),
		########


		###### DUMP_DB ######
		'dump_db' => array(
			'last_sync' => '2013-02-24T23:39:46+00:00',
		),
		########
	);
