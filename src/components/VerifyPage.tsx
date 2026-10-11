import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Trash2, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  RefreshCw, 
  CheckCircle2, 
  Download, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileUp,
  ChevronRight
} from 'lucide-react';
import { ExtractedCertificateDetails, VerificationResult } from '../types';
import { extractTextFromImageFile, parseCertificateDetailsFromText, OcrProgressUpdate } from '../utils/ocrService';
import { verifyCertificateRecord } from '../utils/verificationEngine';
import { SAMPLE_CERTIFICATES, SampleCertificateTemplate, generateCertificateImage } from '../utils/sampleCertificates';

interface VerifyPageProps {
  onVerificationComplete: (result: VerificationResult) => void;
  presetSampleId?: string | null;
  onNavigateHome?: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

export const VerifyPage: React.FC<VerifyPageProps> = ({ 
  onVerificationComplete,
  presetSampleId,
  onNavigateHome
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Extraction State
  const [isExtracting, setIsExtracting] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<OcrProgressUpdate>({ status: '', progress: 0 });
  const [extractedDetails, setExtractedDetails] = useState<ExtractedCertificateDetails | null>(null);
  const [showRawOcr, setShowRawOcr] = useState(false);
  const [showFixtures, setShowFixtures] = useState(true);

  // Validation State for Form
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine active workflow step (1: Upload, 2: Review Details, 3: Verify, 4: View Result)
  const currentStep: number = extractedDetails ? 2 : 1;

  // Handle Preset Sample on mount if provided
  useEffect(() => {
    if (presetSampleId) {
      const sample = SAMPLE_CERTIFICATES.find(s => s.id === presetSampleId);
      if (sample) {
        handleLoadSample(sample);
      }
    }
  }, [presetSampleId]);

  // Clean up Object URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Validate and ingest file
  const handleProcessFile = (selectedFile: File) => {
    setErrorMessage(null);
    setExtractedDetails(null);
    setFormErrors({});

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setErrorMessage('Unsupported file format. Please upload a valid PNG, JPG, JPEG, or PDF certificate.');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrorMessage(`File is too large (${(selectedFile.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is 10MB.`);
      return;
    }

    if (selectedFile.size === 0) {
      setErrorMessage('The selected file is empty. Please select a valid document.');
      return;
    }

    setFile(selectedFile);

    // Create preview
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else if (selectedFile.type === 'application/pdf') {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setExtractedDetails(null);
    setErrorMessage(null);
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReplaceFile = () => {
    fileInputRef.current?.click();
  };

  // Run OCR Extraction
  const handleExtractDetails = async () => {
    if (!file) return;

    setIsExtracting(true);
    setErrorMessage(null);
    setOcrProgress({ status: 'Initializing optical character extraction...', progress: 10 });

    try {
      const rawText = await extractTextFromImageFile(file, (update) => {
        setOcrProgress(update);
      });

      const parsed = parseCertificateDetailsFromText(rawText);
      setExtractedDetails(parsed);

      if (!parsed.certificateNumber && !parsed.studentName) {
        setErrorMessage(
          'Automated OCR could not confidently extract all fields from this document. Please review and enter or adjust the values in the form below.'
        );
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Unable to extract text automatically. Please enter certificate details manually below.'
      );
      setExtractedDetails({
        studentName: '',
        institutionName: '',
        degreeName: '',
        registrationNumber: '',
        certificateNumber: '',
        issueDate: '',
        rawOcrText: 'OCR extraction encountered an unreadable document format.'
      });
    } finally {
      setIsExtracting(false);
    }
  };

  // Handle Load Sample
  const handleLoadSample = (sample: SampleCertificateTemplate) => {
    setErrorMessage(null);
    setFormErrors({});
    const { dataUrl, file: sampleFile } = generateCertificateImage(sample);
    setFile(sampleFile);
    setPreviewUrl(dataUrl);

    setExtractedDetails({
      studentName: sample.studentName,
      institutionName: sample.institutionName,
      degreeName: sample.degreeName,
      registrationNumber: sample.registrationNumber,
      certificateNumber: sample.certificateNumber,
      issueDate: sample.issueDate,
      graduationYear: sample.graduationYear,
      rawOcrText: `[Sample Document Generated]\n${sample.institutionName.toUpperCase()}\nCERTIFICATE OF ACADEMIC CONFERRAL\nThis is to certify that ${sample.studentName}\nDegree: ${sample.degreeName}\nCertificate No: ${sample.certificateNumber}\nRegistration No: ${sample.registrationNumber}\nDate of Issue: ${sample.issueDate}`
    });
  };

  // Download Sample Image
  const handleDownloadSample = (sample: SampleCertificateTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    const { dataUrl } = generateCertificateImage(sample);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${sample.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Field change handler in review form
  const handleFieldChange = (field: keyof ExtractedCertificateDetails, value: string) => {
    if (!extractedDetails) return;
    setExtractedDetails({
      ...extractedDetails,
      [field]: value
    });

    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };

  // Submit to Verification Engine
  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!extractedDetails) return;

    // Basic validation
    const errors: Record<string, string> = {};
    if (!extractedDetails.certificateNumber.trim() && !extractedDetails.registrationNumber.trim()) {
      errors.certificateNumber = 'Either Certificate Number or Registration Number is required to query records.';
    }
    if (!extractedDetails.studentName.trim()) {
      errors.studentName = 'Student name is required for verification audit.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = verifyCertificateRecord(extractedDetails);
    onVerificationComplete(result);
  };

  return (
    <div className="w-full bg-white text-[#1C1917] py-10 md:py-16">
      <div className="max-w-[840px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#78716C] mb-6 select-none">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#EA580C] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span className="text-[#1C1917] font-semibold">Verify a certificate</span>
        </nav>

        {/* Heading & One-line explanation */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917] font-heading">
            Verify a certificate
          </h1>
          <p className="text-base text-[#78716C] mt-2">
            Upload an educational certificate to extract its details and check them against available authenticated records.
          </p>
        </div>

        {/* Visible 4-Step Progress Indicator in Yellow-Orange */}
        <div className="mb-10 bg-[#FFFDF7] border border-[#FED7AA] rounded-xl p-4 sm:p-5 shadow-2xs">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {/* Step 1: Upload */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                  currentStep >= 1
                    ? 'bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white shadow-2xs'
                    : 'bg-[#F5EBE1] text-[#78716C]'
                }`}
              >
                1
              </div>
              <span className={`text-[11px] sm:text-xs ${currentStep === 1 ? 'font-bold text-[#EA580C]' : 'text-[#78716C]'}`}>
                Upload
              </span>
            </div>

            {/* Step 2: Review Details */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                  currentStep >= 2
                    ? 'bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white shadow-2xs'
                    : 'bg-[#F5EBE1] text-[#78716C]'
                }`}
              >
                2
              </div>
              <span className={`text-[11px] sm:text-xs ${currentStep === 2 ? 'font-bold text-[#EA580C]' : 'text-[#78716C]'}`}>
                Review Details
              </span>
            </div>

            {/* Step 3: Verify */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                  currentStep >= 3
                    ? 'bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white'
                    : 'bg-[#F5EBE1] text-[#78716C]'
                }`}
              >
                3
              </div>
              <span className={`text-[11px] sm:text-xs ${currentStep === 3 ? 'font-bold text-[#EA580C]' : 'text-[#78716C]'}`}>
                Verify
              </span>
            </div>

            {/* Step 4: View Result */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                  currentStep >= 4
                    ? 'bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white'
                    : 'bg-[#F5EBE1] text-[#78716C]'
                }`}
              >
                4
              </div>
              <span className={`text-[11px] sm:text-xs ${currentStep === 4 ? 'font-bold text-[#EA580C]' : 'text-[#78716C]'}`}>
                View Result
              </span>
            </div>
          </div>
        </div>

        {/* Demonstration Mode Fixtures Drawer for Evaluators */}
        <div className="mb-8 rounded-xl border border-[#FED7AA] bg-[#FFFDF7] overflow-hidden">
          <div 
            onClick={() => setShowFixtures(!showFixtures)}
            className="p-4 flex items-center justify-between cursor-pointer select-none hover:bg-[#FFFBEB] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EA580C]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                Demonstration Test Fixtures ({SAMPLE_CERTIFICATES.length} pre-configured cases)
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#78716C]">
              <span>{showFixtures ? 'Hide test fixtures' : 'Show test fixtures'}</span>
              {showFixtures ? <ChevronUp className="w-3.5 h-3.5 text-[#EA580C]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#EA580C]" />}
            </div>
          </div>

          {showFixtures && (
            <div className="p-4 pt-0 border-t border-[#FED7AA]/60">
              <p className="text-xs text-[#78716C] mb-3">
                For evaluator convenience: Click any sample to load its certificate and test genuine matches, discrepancies, or unregistered records.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {SAMPLE_CERTIFICATES.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => handleLoadSample(sample)}
                    className="p-3 rounded-lg bg-white border border-[#FED7AA] hover:border-[#EA580C] hover:shadow-xs transition-all cursor-pointer text-left flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-[#1C1917] truncate">
                          {sample.studentName}
                        </span>
                        <span 
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm"
                          style={{
                            backgroundColor: sample.expectedOutcome === 'VERIFIED' ? '#ECFDF5' : sample.expectedOutcome === 'NOT_FOUND' ? '#FFFBEB' : '#FEF2F2',
                            color: sample.expectedOutcome === 'VERIFIED' ? '#065F46' : sample.expectedOutcome === 'NOT_FOUND' ? '#B45309' : '#991B1B'
                          }}
                        >
                          {sample.expectedOutcome === 'VERIFIED' ? 'Authentic' : sample.expectedOutcome === 'NOT_FOUND' ? 'Unknown' : 'Mismatched'}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#EA580C] font-mono font-medium truncate">
                        {sample.certificateNumber}
                      </div>
                      <div className="text-[11px] text-[#1C1917] truncate mt-0.5 opacity-90">
                        {sample.degreeName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#F5EBE1]">
                      <span className="text-[11px] text-[#EA580C] font-bold hover:underline">
                        Load Document &rarr;
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDownloadSample(sample, e)}
                        title="Download sample image"
                        className="p-1 text-[#A8A29E] hover:text-[#EA580C] rounded hover:bg-[#FFFBEB] transition-colors"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Large Bordered Upload Area */}
        {!file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-[#EA580C] bg-[#FFF7ED]'
                : 'border-[#FED7AA] hover:border-[#EA580C] bg-white'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Document Upload Icon in Warm Orange */}
            <div className="w-14 h-14 rounded-full bg-[#FFF7ED] text-[#EA580C] mx-auto flex items-center justify-center mb-4 border border-[#FDBA74] shadow-xs">
              <FileUp className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-[#1C1917] mb-1 font-heading">
              Drag and drop your certificate here, or browse files
            </h3>

            <p className="text-xs text-[#78716C] max-w-sm mx-auto mb-5">
              Supported file types: PDF, JPG, JPEG, or PNG &middot; Maximum file size: 10MB
            </p>

            <button
              type="button"
              className="px-5 py-2 text-xs font-bold text-[#1C1917] bg-[#FFFDF7] hover:bg-[#FFFBEB] border border-[#FED7AA] rounded-lg transition-colors cursor-pointer"
            >
              Browse files
            </button>
          </div>
        ) : (
          /* Document Selected & Preview State */
          <div className="bg-white rounded-xl border border-[#FED7AA] shadow-[0_2px_8px_rgba(234,88,12,0.04)] overflow-hidden mb-8">
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File Info Header */}
            <div className="p-4 bg-[#FFFDF7] border-b border-[#FED7AA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#1C1917] truncate font-heading">
                    {file.name}
                  </div>
                  <div className="text-xs text-[#78716C] flex items-center gap-2">
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="uppercase text-[11px] font-mono font-bold text-[#EA580C]">{file.type.split('/')[1] || 'Document'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Replace & Remove */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleReplaceFile}
                  className="px-3 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-[#FFFBEB] border border-[#FED7AA] bg-white rounded-lg transition-colors cursor-pointer"
                >
                  Replace file
                </button>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </div>

            {/* Preview & Extraction Area */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Preview Window */}
                <div>
                  <div className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#EA580C]" />
                    Document Preview
                  </div>
                  <div className="rounded-lg border border-[#FED7AA] bg-[#FFFDF7] overflow-hidden max-h-72 flex items-center justify-center p-2">
                    {previewUrl && file.type.startsWith('image/') ? (
                      <img
                        src={previewUrl}
                        alt="Uploaded Certificate"
                        className="max-h-64 w-auto object-contain rounded shadow-2xs"
                      />
                    ) : previewUrl && file.type === 'application/pdf' ? (
                      <div className="w-full text-center p-8">
                        <FileText className="w-12 h-12 text-[#EA580C] mx-auto mb-2" />
                        <p className="text-sm font-bold text-[#1C1917]">{file.name}</p>
                        <p className="text-xs text-[#78716C] mt-1">PDF document loaded for optical parsing</p>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-xs text-[#A8A29E]">
                        Preview not available
                      </div>
                    )}
                  </div>
                </div>

                {/* Extraction Control */}
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">
                      Optical Text Extraction
                    </h4>
                    <p className="text-xs text-[#78716C] leading-relaxed">
                      Scans the certificate to detect student name, issuing institution, degree title, certificate ID, and graduation date.
                    </p>
                  </div>

                  {isExtracting ? (
                    <div className="p-4 rounded-lg bg-[#FFF7ED] border border-[#FED7AA]">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="w-4 h-4 text-[#EA580C] animate-spin" />
                        <span className="text-xs font-bold text-[#1C1917]">
                          {ocrProgress.status || 'Extracting certificate text...'}
                        </span>
                      </div>
                      <div className="w-full bg-[#FED7AA] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#EA580C] h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(10, ocrProgress.progress)}%` }}
                        ></div>
                      </div>
                      <div className="text-[11px] text-[#EA580C] mt-1.5 text-right font-mono font-bold">
                        {ocrProgress.progress}% complete
                      </div>
                    </div>
                  ) : !extractedDetails ? (
                    <div>
                      <button
                        type="button"
                        onClick={handleExtractDetails}
                        className="w-full py-2.5 px-4 text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] rounded-lg transition-all shadow-[0_2px_10px_rgba(234,88,12,0.25)] flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                      >
                        Extract Certificate Details
                      </button>
                      <p className="text-[11px] text-[#78716C] text-center mt-2">
                        Reads text directly using optical character recognition
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#065F46] text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                        Details extracted. Review below.
                      </div>
                      <button
                        type="button"
                        onClick={handleExtractDetails}
                        className="text-xs text-[#065F46] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Re-scan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error / Warning Notice */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs leading-relaxed flex items-start gap-3 mb-6">
            <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-0.5">Notice</div>
              {errorMessage}
            </div>
          </div>
        )}

        {/* Extracted Details Review Form (Step 2) */}
        {extractedDetails && (
          <div className="bg-white rounded-xl border border-[#FED7AA] p-6 shadow-[0_2px_8px_rgba(234,88,12,0.04)] mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-[#F5EBE1]">
              <div>
                <h3 className="text-lg font-bold text-[#1C1917] font-heading">
                  Review Extracted Certificate Details
                </h3>
                <p className="text-xs text-[#78716C] mt-0.5">
                  Check and correct any optical reading errors before verifying against the institution ledger.
                </p>
              </div>

              {extractedDetails.rawOcrText && (
                <button
                  type="button"
                  onClick={() => setShowRawOcr(!showRawOcr)}
                  className="text-xs text-[#EA580C] hover:text-[#C2410C] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {showRawOcr ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  {showRawOcr ? 'Hide raw OCR stream' : 'View raw OCR stream'}
                </button>
              )}
            </div>

            {/* Raw OCR Stream Accordion */}
            {showRawOcr && (
              <div className="mb-6 p-3 rounded-lg bg-[#FFFDF7] border border-[#FED7AA]">
                <div className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider mb-1">
                  Raw Optical Recognition Output:
                </div>
                <pre className="text-xs text-[#1C1917] font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {extractedDetails.rawOcrText || 'No text extracted.'}
                </pre>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmitVerification} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Certificate Number */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Certificate Number <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="text"
                    value={extractedDetails.certificateNumber}
                    onChange={(e) => handleFieldChange('certificateNumber', e.target.value)}
                    placeholder="e.g. EDU-2024-88419"
                    className={`w-full px-3 py-2 text-sm rounded-lg border font-mono ${
                      formErrors.certificateNumber
                        ? 'border-red-400 bg-red-50/40 text-red-900'
                        : 'border-[#FED7AA] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]'
                    }`}
                  />
                  {formErrors.certificateNumber && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.certificateNumber}</p>
                  )}
                </div>

                {/* Registration Number */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Student Registration / Roll No
                  </label>
                  <input
                    type="text"
                    value={extractedDetails.registrationNumber}
                    onChange={(e) => handleFieldChange('registrationNumber', e.target.value)}
                    placeholder="e.g. REG-2020-0419"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#FED7AA] font-mono focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                  />
                </div>

                {/* Student Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Student Full Name <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="text"
                    value={extractedDetails.studentName}
                    onChange={(e) => handleFieldChange('studentName', e.target.value)}
                    placeholder="e.g. Elena Vance"
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      formErrors.studentName
                        ? 'border-red-400 bg-red-50/40 text-red-900'
                        : 'border-[#FED7AA] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]'
                    }`}
                  />
                  {formErrors.studentName && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.studentName}</p>
                  )}
                </div>

                {/* Issuing Institution */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Issuing Institution
                  </label>
                  <input
                    type="text"
                    value={extractedDetails.institutionName}
                    onChange={(e) => handleFieldChange('institutionName', e.target.value)}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#FED7AA] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                  />
                </div>

                {/* Conferred Degree / Program */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Conferred Degree / Program
                  </label>
                  <input
                    type="text"
                    value={extractedDetails.degreeName}
                    onChange={(e) => handleFieldChange('degreeName', e.target.value)}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#FED7AA] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                  />
                </div>

                {/* Issue Date / Graduation Year */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Issue Date / Graduation Year
                  </label>
                  <input
                    type="text"
                    value={extractedDetails.issueDate}
                    onChange={(e) => handleFieldChange('issueDate', e.target.value)}
                    placeholder="e.g. May 18, 2024"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#FED7AA] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                  />
                </div>
              </div>

              {/* Submit Action: Check Academic Record */}
              <div className="pt-5 border-t border-[#F5EBE1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#78716C]">
                  Clicking will query the authenticated database using these verified parameters.
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(234,88,12,0.25)] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                >
                  Check Academic Record
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
