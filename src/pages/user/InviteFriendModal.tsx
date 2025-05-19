import { useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";
import { HiOutlineLink } from "react-icons/hi";

export default function InviteFriendModal({ user, openRefer, setRefer }: any) {
  const [copied, setCopied] = useState(false);

  const referId = user?.referId || "defaultId";
  const referralLink = `http://localhost:5173/register?ref=${referId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Modal show={openRefer} onClose={() => setRefer(false)}>
        <ModalHeader>Invite a Friend</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p className="text-sm text-gray-50">
              Share your referral link below. When your friend signs up you can get rewards!
            </p>

            <div>
              <label htmlFor="referralLink" className="text-gray-50">Your Referral Link</label>
              <div className="flex mt-1">
                <TextInput
                  id="referralLink"
                  value={referralLink}
                  readOnly
                  className="w-full"
                />
                <Button onClick={handleCopy} className="ml-2" color="gray">
                  {copied ? "Copied!" : <HiOutlineLink className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setRefer(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
