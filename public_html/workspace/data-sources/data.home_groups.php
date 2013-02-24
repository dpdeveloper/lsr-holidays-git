<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcehome_groups extends SectionDatasource{

		public $dsParamROOTELEMENT = 'home-groups';
		public $dsParamPAGINATERESULTS = 'yes';
		public $dsParamLIMIT = '1';
		public $dsParamSTARTPAGE = '1';
		public $dsParamREDIRECTONEMPTY = 'no';
		public $dsParamSORT = 'system:id';
		public $dsParamASSOCIATEDENTRYCOUNTS = 'no';
		

		

		public $dsParamINCLUDEDELEMENTS = array(
				'content: formatted',
				'image: title'
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
				'release-date' => '2013-02-24T23:37:55+00:00'
			);
		}

		public function getSource(){
			return '3';
		}

		public function allowEditorToParse(){
			return true;
		}

	}
