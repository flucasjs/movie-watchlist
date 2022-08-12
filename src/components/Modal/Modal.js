import "./Modal.css";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({showAddModal, showRemoveModal}) => {
  const modalVariants = {
    hidden: {
      y: '50vw'
    },
    visible: {
      y: 0,
      transition: {
        type: 'spring',
        mass: 0.4,
      }
    },
    exit: {
      y: '100vw',
      transition: {
        ease: 'easeInOut',
        duration: 1
      }
    }
  }

  return (
      <AnimatePresence>
        {
          showAddModal &&
          <motion.div 
            className="add-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Added to watchlist
          </motion.div>
        }
        {
          showRemoveModal &&
          <motion.div 
            className="add-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Removed from watchlist
          </motion.div>
        }
      </AnimatePresence>
    )
  }

  export default Modal;