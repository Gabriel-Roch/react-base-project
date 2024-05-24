import { Modal, Button } from 'rsuite';
import {
    ReactNode,
    useState
} from 'react';
import { ButtonPrimary } from '../buttons/Button';
import {
    Settings2,
    DollarSign
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';


interface PropsModalSuite {
    handleSuccess?: () => void
    handleCancel?: () => void
    sizeModal: "xs" | "sm" | "md" | "lg" | "full"
    body?: ReactNode
    buttonName?: string
    modalTitle: string
    buttonIcon?: "settings" | "dollar"
    visibleFooter?: boolean
    buttonClass?: string
    backdrop?: "static"
}

export function ModalSuite({
    visibleFooter,
    buttonIcon,
    modalTitle,
    buttonName,
    body,
    sizeModal,
    buttonClass,
    backdrop,
    ...props
}: PropsModalSuite) {

    const [modalOpen, setModalOpen] = useState(false)

    const handleSuccess = () => {
        if (props.handleSuccess) {
            props.handleSuccess()
        }
        setModalOpen(false)
    }

    const handleCancel = () => {
        if (props.handleCancel) {
            props.handleCancel()
        }
        setModalOpen(false)
    }

    const BtnIcon = () => {
        if (buttonIcon === "settings") {
            return (
                <div onClick={() => setModalOpen(true)}>
                    <Settings2 className='cursor-pointer' size={20} color="#000000" strokeWidth={1.75} />
                </div>
            )
        }

        if (buttonIcon === "dollar") {
            return (
                <div onClick={() => setModalOpen(true)}>
                    <DollarSign className='cursor-pointer' size={20} color="#219c23" strokeWidth={1.75} onClick={() => setModalOpen(true)} />
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div>
            {buttonIcon ?
                <BtnIcon />
                :
                <ButtonPrimary className={twMerge("", buttonClass)} onClick={() => setModalOpen(true)}>
                    {buttonName}
                </ButtonPrimary>
            }
            <Modal
                size={sizeModal}
                open={modalOpen}
                onClose={handleCancel}
                backdrop={backdrop || true}
            >
                <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                {visibleFooter ?
                    < Modal.Footer >
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSuccess}>
                            Ok
                        </Button>
                    </Modal.Footer>
                    : null
                }
            </Modal>
        </div >
    )
}