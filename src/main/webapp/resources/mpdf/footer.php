<?php
include("BasicFunction.php");
session_start();
include('../phpServices/config.inc');
$username=$_SESSION['username'];
$appointmentID = $_SESSION['printAppointmentID'];
$patientCode = $_SESSION['printPatientCode'];
$date = date('d M, Y');
include('../phpServices/commonServices/appointmentService.php');
include('../phpServices/commonServices/prescriptionService.php');

class PDF extends mPDF {
	
	
	public function Header()
{
    $this->Image('header.png',10,10,190,40,'png','',true, false);
}

function Footer() {
	$this -> image ('footer.png',10,260,185,25,'png','',true, false);
}


function ShowPatInfo($patientCode,$yAxis, $appointmentID){

        $resultData = getPatientInformaition($patientCode);



        $weight = 0;

        $vitalResultData = getPrescribedVital($appointmentID);

        while($row=  mysql_fetch_array($vitalResultData)){


            $vitalID = $row['vitalID'];

            if($vitalID == 81){
                $vitalResult = $row['vitalResult'];
                //$vitalDisplayName = $row['vitalDisplayName'];
                $weight = $vitalResult;
            }

        }

        $rec = mysql_fetch_assoc($resultData);

        $patientCode = $rec['patientCode'];

        $patientCode = substr($patientCode, - 10);

        $name = $rec['name'];

        $age = $rec['age'];

        $sex = $rec['sex'];

        $address = $rec['address'];

        $phone = $rec['phone'];

        $date = date('D d M Y');


        $this->SetXY(100,$yAxis + 10);
        $this->MultiCell(65,5, "ID No: $patientCode");


        $this->SetXY(15,$yAxis + 10);
        $this->MultiCell(65,5, "$name");

        $this->SetXY(15, $yAxis - 8);
        //$this->MultiCell(65, 5, "$phone");

        $this->SetXY(80, $yAxis + 10);
        $this->MultiCell(50, 5, "$age Yrs");


        $this->SetXY(130, $yAxis + 5);
        //$this->MultiCell(30, 5, "$sex");

        $this->SetXY(160, $yAxis + 10);
        $this->MultiCell(50,5, "$date");


        $this->SetXY(100, $yAxis + 5);
        //$this->MultiCell(50, 5, "$address");




        return $rec['patientImage'];

    }

	


function Show_med($appointmentID, $xAxis, $yAxis, $size, $pageNum,$pdf){

        $resultData = getPresCribedDrugs($appointmentID);


        if(mysql_num_rows($resultData) > 0){
            $this->SetFont('nikosh','B',$size);
            $this->SetXY($xAxis , $yAxis);
            $this->MultiCell(40,5,"Rx");
            $yAxis += 6;

        }else{
            return $yAxis - 5;
        }

        $this->SetFont('nikosh','',$size);

        $nameCell = 100;
        $doseCell = 40;
        $durationCell = 70;
        $whenCell = 15;
        $var = 1;
        while($row=  mysql_fetch_array($resultData)){

            //$this->SetFont('Times','',$size + 2);

            $drugType = $row['typeInitial'];
            $drugTypeID = $row['drugTypeID'];
            $drugName = $row['drugName'];
            $drugStr = $row['drugStrength'];
            $drugPrescribeID = $row['id'];
            $drugTime = $row['doseTypeCode'];
            $drugDoseInitial = $row['drugDoseUnit'];
            $drugWhen = $row['whenTypeName'];
            $drugWhenID = $row['drugWhenID'];
            $drugAdvice = $row['adviceTypeName'];
            $drugAdviceID = $row['drugAdviceID'];


            $yAxis =  $this->GetY() + 2;
            if(($yAxis + 10)  > 260 ){
                $this->AddPage();
                $yAxis = 60;
            }


            $this->SetXY($xAxis, $yAxis);
            if($drugStr  == ""){
                $this->MultiCell($nameCell,5,"$var. $drugType. $drugName");
            }else{
                $this->MultiCell($nameCell,5,"$var. $drugType. $drugName - $drugStr");
            }
            $var = $var + 1;
			
			
			$this->SetXY($xInnerAxis, $yAxis);
		$realY =  $this->GetY();
		if($drugDoseInitial != ""){
			if($drugTypeID == 3 || $drugTypeID == 15 || $drugTypeID == 41){
				$drugDoseInitial = str_replace("s","?? ????", $drugDoseInitial);
			}else if($drugTypeID == 4){
				$drugDoseInitial = str_replace("ampl","?????", $drugDoseInitial);
				$drugDoseInitial = str_replace("vial","?????", $drugDoseInitial);
			}else if($drugTypeID == 10 || $drugTypeID == 14 || $drugTypeID == 21){
				$drugDoseInitial = str_replace("puff","???", $drugDoseInitial);
			}else if($drugTypeID == 7){
				$drugDoseInitial = str_replace("d","????", $drugDoseInitial);
			}else if($drugTypeID == 6){
				$drugDoseInitial = str_replace("u","(+/-) 2 ?????", $drugDoseInitial);
			}else if($drugTypeID == 11){
				$drugDoseInitial = str_replace("drp/min","????/????? ", $drugDoseInitial);	
			}
		}


            $this->SetXY($xAxis + 65, $yAxis );
            //$this->MultiCell($nameCell,5,"$xAxis - $yAxis");

            $doseData = getPreiodicListforPdf($drugPrescribeID);



            if($drugTime != -1){

                $dose = mysql_fetch_assoc($doseData);
                $drugDose = $dose['dose'];
                $drugNoDay = $dose['numOfDay'];
                $drugNoDayType = $dose['bangla'];

                $drugDose = str_replace("-","+", $drugDose);
                if($drugTime == 1){
                    if($drugAdviceID == 14 || $drugWhenID == 11 || $drugAdviceID == 54 || $drugAdviceID == 62 || $drugWhenID == 23){
                        $drugDose =  "$drugDose + 0 + 0";
                    }else if ($drugAdviceID == 15 || $drugWhenID == 13){
                        $drugDose =  "0 + 0 + $drugDose";
                    }else if($drugAdviceID == 16 || $drugWhenID == 12){
                        $drugDose =  "0 + $drugDose + 0";
                    }else{
                        $drugDose =  "0 + 0 + $drugDose";
                    }

                }else if($drugTime == 2){
                    list($num,$type) = explode('+', $drugDose, 2);
                    $drugDose =  "$num + 0 + $type";
                }


                if($drugNoDay == 0){
                    $drugNoDay = "";
                }
                $restOftheString = "- $drugWhen - $drugAdvice - $drugNoDay $drugNoDayType";

            }else{
                $index= 0;
                $periodText = "";

                while ($dose = mysql_fetch_array($doseData)){
                    $drugDose = $dose['dose'];
                    $drugNoDay = $dose['numOfDay'];
                    $drugNoDayType = $dose['bangla'];

                    $drugDose = str_replace("-","+", $drugDose);
                    if($drugTime == 1){
                        if($drugAdviceID == 14){
                            $drugDose =  "$drugDose + 0 + 0";
                        }else if ($drugAdviceID == 15){
                            $drugDose =  "0 + 0 + $drugDose";
                        }else{
                            $drugDose =  "0 + $drugDose + 0";
                        }

                    }else if($drugTime == 2){
                        list($num,$type) = explode('+', $drugDose, 2);
                        $drugDose =  "$num + 0 + $type";
                    }

                    $text = "";
                    if($drugDoseInitial == ""){
                        $text = "($drugDose)";
                    }else{
                        $text = "($drugDose) $drugDoseInitial $drugNoDay $drugNoDayType";
                    }

                    if($index == 0){
                        $periodText = '?????'. " $drugNoDay $drugNoDayType $text";
                    }else{
                        $periodText = "$periodText". " ????? " . " $text $drugNoDay $drugNoDayType";
                    }
                    $index++;

                }

                $restOftheString = "$periodText $drugWhen $drugAdvice";
                $drugDose = "";
            }

            $full_str = "";
            if($drugDoseInitial == "" || $drugDose == ''){
                $full_str = "$drugDose $restOftheString|";
            }else{
                $full_str ="($drugDose) $drugDoseInitial $restOftheString|";
            }

            $full_str = $this->convertNumberToBangla($full_str);

            $this->MultiCell(70,5,"$full_str");
            //$yAxis += 8;
        }

        return $this->GetY();

    }

}







$pdf = new PDF('','A4',10,'nikosh');
$pdf->WriteHTML('');

//$pdf->SetAutoPageBreak(true, 12);

$res = getAppointmentInfo($appointmentID);
$appData = mysql_fetch_assoc($res);
$appType = $appData['appointmentType'];

$lineStyle = array('width' => 20, 'cap' => 'butt', 'join' => 'miter', 'dash' => '', 'phase' => 0, 'color' => array(255, 0, 0));
$pdf->Line(10, 53, 195, 53, $linestyle);
$pdf->Line(10, 60, 195, 60, $linestyle);
//$pdf->Line(10, 260, 195, 260, $linestyle);

$leftYaxis = 65;
$rightYaxis = 70;
$size = 10;

$leftXaxis = 15;
$rightXaxis = 65;
$maxX = 40;
$maxXForRight = 100;

$gap = 5;
$photoSize = 25;

$pageNum = 1;
$pdf->page = $pageNum;


$pdf->Line($rightXaxis - 3 , 60, $rightXaxis - 3, 270, $lineStyle);


$rightYaxis = $pdf->Show_med($appointmentID,$rightXaxis, $rightYaxis,$size + 1, $pageNum, $pdf);
$rightYaxis = $pdf->checkForPageChange($rightYaxis, $pdf->page);
$rightYaxis = $pdf->Show_advice($appointmentID,$rightXaxis,$rightYaxis + 10,$size + 1,$maxXForRight);
$rightYaxis = $pdf->checkForPageChange($rightYaxis, $pdf->page);
$rightYaxis = $pdf-> show_nextVisit($appointmentID,$rightXaxis,$rightYaxis + 10 ,$size +2);


$yPageNo = $pdf->page;
$pageNum = 1;
$pdf->page = $pageNum;

if($appType != 4){
    $patientImage = $pdf->ShowPatInfo($patientCode, 45, $username);
    if($patientImage != null){
        $pdf->displayImage($username, $patientImage,$leftXaxis,$leftYaxis,$photoSize);
        $gap = $gap + $photoSize;
    }
}

$leftYaxis=$pdf->Show_Complain($appointmentID,$leftXaxis,$leftYaxis + $gap, $maxX , $size);
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->Show_vital($appointmentID,$leftXaxis,$leftYaxis + 5, $maxX , $size);
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->Show_History($appointmentID,$leftXaxis,$leftYaxis +5, $maxX , $size, "RISK", "Risk Factors");
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->Show_Past_History($appointmentID,$leftXaxis,$leftYaxis + 5, $maxX, $size , 0 , "Past Disease");
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->Show_Past_History($appointmentID,$leftXaxis,$leftYaxis + 5, $maxX, $size , 1 , "Associated Illness");
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->Show_Family_History($appointmentID,$leftXaxis,$leftYaxis + 5, $maxX, $size);
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->Show_Drug_History($appointmentID,$leftXaxis,$leftYaxis + 5, $maxX, $size , "OLDDRUGS" , "Old Drugs");
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->Show_Drug_History($appointmentID,$leftXaxis,$leftYaxis + 5, $maxX, $size , "CURRDRUGS" , "Current Drugs");
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->showClinicalRecord($appointmentID,$leftXaxis,$leftYaxis + 5, $maxX, $size);
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->Show_inv($appointmentID,$leftXaxis,$leftYaxis + 5 , $maxX , $size);
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis = $pdf->Show_diagnosis($appointmentID, $leftXaxis ,$leftYaxis + 5 ,$size , $maxX);
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf->showComment($appointmentID,$leftXaxis,$leftYaxis + 5, $maxX, $size);
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);
$leftYaxis=$pdf-> show_ref_doc($appointmentID,$leftXaxis,$leftYaxis + 5,$size);
$leftYaxis = $pdf->checkForPageChange($leftYaxis, $pdf->page);

if($yPageNo > $pdf->page){
    $pdf->page = $yPageNo;
    $pdf->Line($rightXaxis - 3 , 60, $rightXaxis - 3, 270, $lineStyle);
	$pdf->Line(10, 53, 195, 53, $linestyle);
	$pdf->Line(10, 60, 195, 60, $linestyle);
}

//$pdf-> show_diagnosis($appointmentID,15,55,$size);
//$pdf-> show_ref_doc($appointmentID,15,260,$size);
//$pdf->showDocInfo($username, 15, $size );


$pdf->Output('');
exit;
?>
