<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcehome_groups extends SectionDatasource{

		public $dsParamROOTELEMENT = 'home-groups';
		public $dsParamORDER = 'null';
		public $dsParamPAGINATERESULTS = 'yes';
		public $dsParamLIMIT = '1';
		public $dsParamSTARTPAGE = '1';
		public $dsParamREDIRECTONEMPTY = 'no';
		public $dsParamSORT = 'system:id';
		public $dsParamHTMLENCODE = 'yes';
		public $dsParamASSOCIATEDENTRYCOUNTS = 'no';
		

		

		public $dsParamINCLUDEDELEMENTS = array(
				'content: formatted',
				'image: title',
				'image: image'
		);
		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'Home: Groups',
				'author' => array(
					'name' => 'David Anderson',
					'website' => 'http://localhost/~david/lsr-holidays-content/public_html',
					'email' => 'dave@veodesign.co.uk'),
				'version' => 'Symphony 2.3.1',
				'release-date' => '2013-02-25T07:54:50+00:00'
			);
		}

		public function getSource(){
			return '3';
		}

		public function allowEditorToParse(){
			return true;
		}

	}
