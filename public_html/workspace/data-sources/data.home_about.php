<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcehome_about extends SectionDatasource{

		public $dsParamROOTELEMENT = 'home-about';
		public $dsParamORDER = 'null';
		public $dsParamPAGINATERESULTS = 'yes';
		public $dsParamLIMIT = '1';
		public $dsParamSTARTPAGE = '1';
		public $dsParamREDIRECTONEMPTY = 'no';
		public $dsParamSORT = 'system:id';
		public $dsParamHTMLENCODE = 'yes';
		public $dsParamASSOCIATEDENTRYCOUNTS = 'no';
		

		

		public $dsParamINCLUDEDELEMENTS = array(
				'header: formatted',
				'column-1: formatted',
				'column-2: formatted',
				'column-3: formatted'
		);
		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'Home: About',
				'author' => array(
					'name' => 'David Anderson',
					'website' => 'http://localhost/~david/lsr-holidays-content/public_html',
					'email' => 'dave@veodesign.co.uk'),
				'version' => 'Symphony 2.3.1',
				'release-date' => '2013-02-25T07:48:24+00:00'
			);
		}

		public function getSource(){
			return '1';
		}

		public function allowEditorToParse(){
			return true;
		}

	}
